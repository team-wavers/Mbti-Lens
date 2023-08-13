import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_API_KEY'),
      callbackURL: 'v1/auth/oauth/kakao/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const { _json } = profile;
      const user = {
        email: _json.kakao_account.email,
        nickname: _json.properties.nickname,
        phone_number: _json.kakao_account.phone_number,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
