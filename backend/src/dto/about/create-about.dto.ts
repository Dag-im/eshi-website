import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  paragraphs!: string[];
}
