import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy],
})
export class AuthModule {}
