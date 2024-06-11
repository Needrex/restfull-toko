import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';

@Module({
  providers: [DatabaseService],
  imports: [MyLoggerModule],
})
export class DatabaseModule {}
