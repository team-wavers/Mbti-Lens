import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async handleKakaoLogin(kakaoUser: any, res: Response): Promise<void> {
    const { userid } = kakaoUser;
    let user = await this.usersService.findOne({
      where: { userid: userid },
    });

    if (!user) {
      user = await this.usersService.createUser(kakaoUser);
    }
    res.json(kakaoUser.accessToken);
  }
}
