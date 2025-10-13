import { IsNotEmpty, IsInt, Min, isNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

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

  // status mặc định sẽ set trong entity (pending)
}
