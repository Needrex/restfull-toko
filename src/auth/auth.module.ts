import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google-strategy/google-strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy-jwt/strategy-jwt';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    MyLoggerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '500s',
      },
    }),
  ],
  controllers: [AuthController],
  exports: [JwtStrategy],
  providers: [GoogleStrategy, JwtStrategy, AuthService, PrismaClient],
})
export class AuthModule {}
