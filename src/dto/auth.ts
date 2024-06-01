import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  picture: string;
  @IsString()
  accessToken: string;
}
