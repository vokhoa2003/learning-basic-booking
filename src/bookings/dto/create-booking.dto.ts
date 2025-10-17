import { IsNotEmpty, IsInt, Min, isNotEmpty, IsNumber, IsString, IsOptional, IsIn, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserInfoDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsInt()
  @IsNotEmpty()
  gender: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  date_of_birth: string; // Format: YYYY-MM-DD
}

export class CreateBookingDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  // Thông tin user để tạo mới nếu không có user_id
  @IsOptional()
  @ValidateNested()
  @Type(() => UserInfoDto)
  user_info?: UserInfoDto;

  @IsNotEmpty()
  @IsInt()
  option_id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsNumber()
  total_price: number; 

  @IsString()
  status: string;

  @IsOptional()
  @IsIn(['cash', 'bank_transfer'])
  payment_method?: 'cash' | 'bank_transfer';
  // status mặc định sẽ set trong entity (pending)
}
