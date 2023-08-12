import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './api/v1/v1.module';
import { CONFIG_VALIDATOR } from './config/config.validator';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [V1Module, ConfigModule.forRoot(CONFIG_VALIDATOR)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
