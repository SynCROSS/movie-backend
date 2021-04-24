import { IsString } from 'class-validator';

export class UserDTO {
  @IsString() name!: string;
  @IsString() nickname!: string;
  @IsString() password!: string;
}
