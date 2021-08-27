import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.getUserByUsername(username);

      if (
        user?.username === username &&
        compareSync(password, user?.password)
      ) {
        return {
          username: user.username,
          nickname: user.nickname,
          email: user.email,
        };
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  }

  async login(loginData: LoginDTO) {
    try {
      const user = await this.userService.getUserByUsername(
        loginData?.username,
      );

      return {
        access_token: this.jwtService.sign(
          {
            username: user.username,
            nickname: user.nickname,
            email: user.email,
          },
          { expiresIn: '30m' },
        ),
      };
    } catch (e) {
      console.error(e);
    }
  }
}
