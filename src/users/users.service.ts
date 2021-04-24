import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { hashSync, genSalt } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(userDto: UserDTO) {
    try {
      const salt = await genSalt(10);

      return await this.userRepository.save(
        this.userRepository.create({
          ...userDto,
          password: hashSync(userDto?.password, salt),
        }),
      );
    } catch (e) {
      console.error(e);
    }
  }

  async getUser(nickname: string) {
    try {
      return await this.userRepository.findOne({ nickname });
    } catch (e) {
      console.error(e);
    }
  }
}
