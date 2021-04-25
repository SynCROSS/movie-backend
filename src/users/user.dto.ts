import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDTO {
  @IsString() username!: string;
  @IsOptional() @IsEmail() email: string;
  @IsString() nickname!: string;
  @IsString() password!: string;
}

export class LoginDTO {
  @IsString() username: string;
  @IsString() password: string;
}
