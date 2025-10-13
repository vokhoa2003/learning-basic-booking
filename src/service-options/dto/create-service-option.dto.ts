import { IsNotEmpty, IsString, IsInt, Min, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceOptionDto {
  @IsNotEmpty()
  @IsInt()
  service_id: number;

  @IsNotEmpty()
  @IsString()
  option_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: Number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  available_slots: number;

  @IsOptional()
  @IsInt()
  created_by?: number; // User ID
}
