import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaClient, JwtService],
  imports: [MyLoggerModule],
})
export class UserModule {}
