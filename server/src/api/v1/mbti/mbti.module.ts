import { Module } from '@nestjs/common';
import { MbtiService } from './mbti.service';
import { MbtiController } from './mbti.controller';
import { MbtiProviders } from './mbti.provider';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MbtiController],
  providers: [MbtiService, ...MbtiProviders],
  exports: [MbtiService],
})
export class MbtiModule {}
