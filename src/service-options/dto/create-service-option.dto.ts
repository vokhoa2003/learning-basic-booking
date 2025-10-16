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
  price?: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  available_slot: number;

  @IsOptional()
  @IsInt()
  create_by?: number; // User ID
}
