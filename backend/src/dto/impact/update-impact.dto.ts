import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateImpactDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  desc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  stat?: string;
}
