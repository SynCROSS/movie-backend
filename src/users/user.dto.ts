import { IsString } from 'class-validator';

export class RegisterDTO {
  @IsString() username!: string;
  @IsString() nickname!: string;
  @IsString() password!: string;
}
