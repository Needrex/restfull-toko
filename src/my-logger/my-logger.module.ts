import { Module } from '@nestjs/common';
import { Logger } from './logger/logger';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class MyLoggerModule {}
