import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  service: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  created_by?: number; // User ID
}
