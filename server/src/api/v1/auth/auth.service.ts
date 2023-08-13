import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async handleKakaoLogin(kakaoUser: any, res: Response): Promise<void> {
    const { email, nickname, phone_number } = kakaoUser;

    // 카카오 가입 여부 확인
    let user = await this.usersService.findOne({ email });

    if (!user) {
      // 카카오 가입이 안되어있는 경우, 회원 가입
      user = await this.usersService.createUser(kakaoUser);
    }

    // JWT 토큰 발행
    const payload = {
      sub: user._id,
      email: user.email,
    };
    const authToken = this.jwtService.sign(payload);

    // 리다이렉트
    res.redirect(`v1/auth/oauth/kakao/callback?token=${authToken}`);
  }
}
