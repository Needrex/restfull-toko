import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class ValidCookieMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: unknown, next: () => void) {
    try {
      const token = req.cookies['token'];

      if (token) {
        const result = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        if (result) {
          next();
        } else {
          throw new Error('Unauthorized');
        }
      } else {
        throw new Error('Unauthorized');
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(e, HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
