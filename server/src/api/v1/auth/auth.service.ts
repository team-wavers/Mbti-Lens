import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async handleKakaoLogin(kakaoUser: any, res: Response): Promise<void> {
    const { userid } = kakaoUser;
    let user = await this.usersService.findOne({
      where: { userid: userid },
    });

    if (!user) {
      user = await this.usersService.createUser(kakaoUser);
    }

    const usercookie = JSON.stringify({
      userid: user._id,
      username: user.nickname,
      public_key: user.public_key,
    });

    const redirectUrl = this.configService.get('REDIRECT_URL');
    const rootUrl = this.configService.get('ROOT_URL');

    if (redirectUrl) {
      res
        .cookie('user', usercookie, {
          expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 만료기간 5일
          domain: rootUrl,
        })
        .redirect(redirectUrl);
    } else {
      error('REDIRECT_URL is not defined');
    }
  }
}
