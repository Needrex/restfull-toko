import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FindUserDto } from 'src/dto/user';

@Injectable()
export class UserService {
  constructor(private userModel: PrismaClient) {}
  async findOneData(data: FindUserDto) {
    const result = await this.userModel.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (result) {
      const data = {
        nama: result.nama,
        email: result.email,
        role: result.role,
        kelamin: result.kelamin,
        alamat: result.alamat,
        picture: `http://localhost:5000/uploads/${result.picture}`,
      };
      return data;
    } else {
      throw new Error('Data is empty');
    }
  }

  async showAllData() {
    const result = await this.userModel.user.findMany();

    if (result) {
      return result;
    } else {
      throw new Error('Failed to show all data');
    }
  }

  async editData(datareq: object, email: string) {
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
