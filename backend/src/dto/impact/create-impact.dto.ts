import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateImpactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  desc!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  stat!: string;
}
