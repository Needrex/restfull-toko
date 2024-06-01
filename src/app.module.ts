import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { APP_FILTER } from '@nestjs/core';
// import { CustomExceptionFilter } from './custom-exception/custom-exception.filter';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ValidCookieMiddleware } from './valid-cookie/valid-cookie.middleware';
import { UserController } from './user/user/user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidCookieMiddleware).forRoutes(UserController);
  }
}
