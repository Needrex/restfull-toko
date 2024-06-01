import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    console.log('DB connect!');

    return this.$connect;
  }
}
