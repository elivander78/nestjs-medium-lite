import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class Pagination {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;
}
