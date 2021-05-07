import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDTO } from './user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }

  @Post('register')
  async register(@Body() registerData: RegisterDTO) {
    return await this.userService.register(registerData);
  }
}
