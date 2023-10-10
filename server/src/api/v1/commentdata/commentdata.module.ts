import { Module } from '@nestjs/common';
import { CommentdataService } from './commentdata.service';
import { CommentdataController } from './commentdata.controller';
import { CommentDataProviders } from './commentdata.provider';
import { DatabaseModule } from 'src/db/db.module';
import { MbtiModule } from '../mbti/mbti.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, MbtiModule, UsersModule],
  controllers: [CommentdataController],
  providers: [CommentdataService, ...CommentDataProviders],
})
export class CommentdataModule {}
