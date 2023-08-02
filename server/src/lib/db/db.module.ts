import { Module } from '@nestjs/common';
import { dbProviders } from './db.providers';

@Module({
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DatabaseModule {}
