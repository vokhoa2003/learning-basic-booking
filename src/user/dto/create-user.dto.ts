import { IsString, IsEmail, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsInt()
  gender: number; // 1 = Nam, 2 = Nữ

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  refresh_token?: string | null;

  @IsString()
  role: string;

  @IsDate()
  @IsOptional() // nếu muốn cho phép không gửi date_of_birth
  date_of_birth?: Date;
}
