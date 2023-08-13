import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('v1/auth/oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    // 사용자를 카카오 인증 페이지로 리다이렉트
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (user) {
      this.authService.handleKakaoLogin(user, res);
    } else {
      // 로그인 실패 처리
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    // 로그아웃 로직 구현 (토큰 무효화 등)
    res.redirect('/');
  }
}
