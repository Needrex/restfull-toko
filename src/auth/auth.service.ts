import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../dto/auth';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'src/my-logger/logger/logger';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userModel: PrismaClient,
    private logger: Logger,
  ) {}

  async login(user: AuthDto, res: Response): Promise<boolean> {
    try {
      if (!user) {
        throw Error('unauthorized');
      } else {
        const cekData = await this.userModel.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (cekData) {
          const token = await this.jwtService.signAsync(cekData, {
            privateKey: process.env.JWT_SECRET,
          });

          res.cookie('token', token, {
            maxAge: 600000,
          });
          return true;
        } else {
          const saveData = await this.userModel.user.create({
            data: {
              nama: `${user.firstName} ${user.lastName}`,
              email: user.email,
              picture: user.picture,
            },
          });

          if (saveData) {
            const token = await this.jwtService.signAsync(saveData, {
              privateKey: process.env.JWT_SECRET,
            });

            res.cookie('token', token, {
              maxAge: 60000,
            });
            return true;
          } else {
            throw Error('gagal membuat user baru');
          }
        }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }
  }
}
