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
        !user?.username ||
        !user?.nickname ||
        !user?.password ||
        !user?.email
      ) {
        return null;
      }

      const { nickname, email } = user;

      if (
        user?.username === username &&
        compareSync(password, user?.password)
      ) {
        return {
          username,
          nickname,
          email,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  async login(loginData: LoginDTO) {
    try {
      const user = await this.userService.getUserByUsername(
        loginData?.username,
      );

      if (
        !user?.username ||
        !user?.nickname ||
        !user?.password ||
        !user?.email
      ) {
        return null;
      }

      const { username, nickname, email } = user;

      return {
        access_token: this.jwtService.sign(
          {
            username,
            nickname,
            email,
          },
          {
            expiresIn: '30m',
          },
        ),
      };
    } catch (e) {
      console.error(e);
    }
  }
}
