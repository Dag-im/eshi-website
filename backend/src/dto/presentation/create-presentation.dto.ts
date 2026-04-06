import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePresentationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description!: string;
}
