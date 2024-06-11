import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Logger } from 'src/my-logger/logger/logger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: Logger,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    this.logger.log('user request in google auth');
  }

  @Get('google/callback')
  @HttpCode(301)
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      // Pengguna akan di-redirect ke sini setelah berhasil login

      const result = await this.authService.login(req.user, res);
      if (result == true) {
        res.redirect('/api/user');
      } else {
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }
  }
}
