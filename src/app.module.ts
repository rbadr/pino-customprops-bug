import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { pinoLoggerConfigFactory } from './configuration/logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: pinoLoggerConfigFactory,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
