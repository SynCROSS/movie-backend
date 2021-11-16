import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('check')
  checkLoggedIn(@Req() req: Request) {
    return req.isAuthenticated();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    if (!req.isAuthenticated) {
      return await this.authService.login(req.body);
    }

    return {
      message: 'User Is Already Logged In!',
    };
  }
}
