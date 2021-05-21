import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../users/user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    if (user?.username === username && compareSync(password, user?.password)) {
      const {
        id,
        password,
        createdAt,
        updatedAt,
        deletedAt,
        bookedSeats,
        ...results
      } = user;
      return results;
    }
    return null;
  }

  async login(loginData: LoginDTO, res: Response) {
    try {
      const user = await this.userService.getUserByUsername(
        loginData?.username,
      );

      const {
        id,
        password,
        createdAt,
        updatedAt,
        deletedAt,
        bookedSeats,
        ...results
      } = user;

      return {
        access_token: this.jwtService.sign(results, { expiresIn: '30m' }),
      };
    } catch (e) {
      console.error(e);
    }
  }
}
