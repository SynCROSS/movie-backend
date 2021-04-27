import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './user.dto';
import { hashSync, genSalt } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserByUsername(username: string) {
    try {
      return await this.userRepository.findOne(username);
    } catch (e) {
      console.error(e);
    }
  }

  async register(registerDTO: RegisterDTO) {
    try {
      const salt = await genSalt(10);

      return await this.userRepository.save(
        this.userRepository.create({
          ...registerDTO,
          password: hashSync(registerDTO?.password, salt),
        }),
      );
    } catch (e) {
      console.error(e);
    }
  }
}
