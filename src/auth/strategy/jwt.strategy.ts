import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    config: ConfigService,
    private prisma: PrismaService
) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.prisma.user.findUnique({
          where: {
              id: payload.sub
          },
      })

      return user;
    } catch (error) {
      throw new ForbiddenException("Token invalid")
    }
  }
}