import { IsInt, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class ResetPasswordDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId!: number;

  @IsString()
  @MinLength(8)
  newPassword!: string;
}
