import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon from "argon2"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: AuthDto) {        
        try {
            const hashedPassword = await argon.hash(dto.password)
            const role = "FARMER"

            const user = await this.prisma.user.create({
                data: {
                    role: role,
                    name: dto.name,
                    locationId: dto.locationId,
                    farmSize: dto.farmSize,
                    email: dto.email,
                    coordinates: dto.coordinates,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })

            
            return this.signToken(user.id, user.email)
            
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Credentials taken")
                }
            }
            else {
                throw error
            }
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) {
            throw new ForbiddenException("Credentials incorrect")
        }

        const pwdMatches = await argon.verify(user.password, dto.password)

        if (!pwdMatches) {
            throw new ForbiddenException("Credentials incorrect")
        }

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: string, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email: email
        }

        const secret = this.config.get("JWT_SECRET")

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "90d",
            secret: secret
        })

        return {
            access_token: token
        }
    }
}