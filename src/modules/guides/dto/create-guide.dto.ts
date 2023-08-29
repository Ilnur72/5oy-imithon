import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuideDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  notify: boolean;
}
