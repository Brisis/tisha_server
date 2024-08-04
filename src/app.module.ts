import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { InputModule } from './input/input.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    InputModule,
    LocationModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
