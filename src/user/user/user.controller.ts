import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user';
import { GetCookie } from '../get-cookie/get-cookie.decorator';
import { JwtService } from '@nestjs/jwt';
import { ValidationPipe } from '../validation/validation.pipe';
import { Logger } from 'src/my-logger/logger/logger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadConfig } from './uploadsConfig';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private logger: Logger,
  ) {}
  @Get('find')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async findOneUser(@GetCookie('token') token: string): Promise<object> {
    try {
      const resultToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      console.log(resultToken);

      return await this.userService.findOneData(resultToken);
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Get()
  @HttpCode(200)
  async showAllData(): Promise<object> {
    try {
      return await this.userService.showAllData();
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Put()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('picture', uploadConfig))
  async editUser(
    @Body() reqData: UserDto,
    @GetCookie('token') token: string,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<object> {
    try {
      console.log(file);
      if (file) {
        reqData.picture = file.filename;
      }

      const resultToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const resultData = await this.userService.editData(
        reqData,
        resultToken.email,
      );

      return {
        resultData,
        message: 'Succes edit data',
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
