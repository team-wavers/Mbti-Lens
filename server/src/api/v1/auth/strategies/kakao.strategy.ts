import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { nanoid } from 'nanoid';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_API_KEY'),
      callbackURL: configService.get('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const public_key = nanoid();
      const { _json } = profile;
      const user = {
        userid: _json.id,
        nickname: _json.properties.nickname,
        gender: _json.kakao_account.gender,
        age: _json.kakao_account.age_range,
        public_key: public_key,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
