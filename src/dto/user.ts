import {
  IsEmail,
  IsEnum,
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

enum Role {
  user,
  admin,
}

enum Kelamin {
  PRIA = 'pria',
  WANITA = 'wanita',
}

export class UserDto {
  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsOptional()
  nama?: string;

  @IsString()
  @IsOptional()
  alamat?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(Kelamin)
  @IsOptional()
  kelamin?: Kelamin;
}

export class FindUserDto {
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    message: 'Email tidak valid',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
