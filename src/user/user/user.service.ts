import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private userModel: PrismaClient) {}
  async showUser() {
    return await this.userModel.user.findMany();
  }

  async editUser(datareq: object, email: string) {
    const result = await this.userModel.user.update({
      data: datareq,
      where: {
        email: email,
      },
    });

    if (result) {
      return result;
    } else {
      throw new Error('Failed to edit data');
    }
  }
}
