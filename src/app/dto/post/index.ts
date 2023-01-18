import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class ReactionsDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  reactor?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(3)
  reaction: number;
}

export class PostDTO {
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
