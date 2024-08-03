import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc'
            }
        })
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            throw new NotFoundException
        }

        return user
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.prisma.user.create({
                data: createUserDto
            })

            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException
        }
      
        const updatedUser = await this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto
        })

        return updatedUser;
    }

    async delete(id: string) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException
        }

        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}
