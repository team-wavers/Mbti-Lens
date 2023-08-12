import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/db/db.module';
import { usersProviders } from './users.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
