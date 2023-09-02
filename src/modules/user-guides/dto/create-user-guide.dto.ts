import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserGuideDto {
  @IsNotEmpty()
  @IsMongoId()
  guide_id: string;

  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
