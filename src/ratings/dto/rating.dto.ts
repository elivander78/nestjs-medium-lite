import { IsNumber, IsPositive, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RatingDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;
}
