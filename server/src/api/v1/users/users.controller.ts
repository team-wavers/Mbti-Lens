import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<Users | undefined> {
    const user = await this.usersService.findOne({ email });
    return user;
  }

  @Post()
  async createUser(@Body() user: Users): Promise<Users> {
    return this.usersService.createUser(user);
  }
}
