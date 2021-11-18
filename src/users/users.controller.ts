import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDTO } from './user.dto';
import { Request } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }

  @Post('register')
  async register(@Req() req: Request, @Body() registerData: RegisterDTO) {
    if (!req.isAuthenticated()) {
      return await this.userService.register(registerData);
    }
    return {
      message: 'User Is Already Logged In!',
    };
  }
}
