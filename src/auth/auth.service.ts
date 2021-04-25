import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUser(username);

    if (user?.username === username && compareSync(password, user?.password)) {
      const {
        id,
        password,
        createdAt,
        updatedAt,
        deletedAt,
        ...results
      } = user;
      return results;
    }
    return null;
  }

  login(user) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
