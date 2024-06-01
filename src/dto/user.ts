import { IsEmail, IsEnum, IsString } from 'class-validator';

enum Role {
  user,
  admin,
}

enum Kelamin {
  pria,
  wanita,
}

export class UserDto {
  @IsString()
  nama: string;

  @IsString()
  picture: string;

  @IsEmail()
  email: string;

  @IsString()
  alamat: string;

  @IsEnum(Role)
  role: Role;

  @IsEnum(Kelamin)
  kelamin: Kelamin;
}
