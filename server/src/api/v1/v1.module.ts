import { Module } from '@nestjs/common';
import { V1Service } from './v1.service';
import { V1Controller } from './v1.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MbtiModule } from './mbti/mbti.module';

@Module({
  controllers: [V1Controller],
  providers: [V1Service],
  imports: [AuthModule, UsersModule, MbtiModule],
})
export class V1Module {}
