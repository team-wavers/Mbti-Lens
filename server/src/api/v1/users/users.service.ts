import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async createUser(user: Users): Promise<Users> {
    return await this.usersRepository.save(user);
  }

  async findOne(options: any): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne(options);

    if (!user) {
      throw new BadRequestException('user data not found');
    }

    return user;
  }
}
