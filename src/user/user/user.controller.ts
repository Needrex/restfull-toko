import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user';
import { GetCookie } from '../get-cookie/get-cookie.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Get()
  @HttpCode(200)
  async showUser() {
    return await this.userService.showUser();
  }

  @Put()
  @HttpCode(201)
  async createUser(
    @Body() reqData: UserDto,
    @GetCookie('token') token: string,
  ) {
    try {
      console.log(reqData);

      const resultToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const resultData = await this.userService.editUser(
        reqData,
        resultToken.email,
      );

      return {
        resultData,
        message: 'Succes create data',
      };
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
