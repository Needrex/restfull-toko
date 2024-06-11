import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'src/my-logger/logger/logger';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor(private logger: Logger) {
    super();
  }
  onModuleInit() {
    this.logger.log('DB connect!');

    return this.$connect;
  }
}
