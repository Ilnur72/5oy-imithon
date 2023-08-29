import { IsBoolean, IsMongoId } from 'class-validator';

export class CreateUserGuideDto {
  @IsMongoId()
  guide_id: string;

  @IsMongoId()
  user_id: string;

  @IsBoolean()
  completed: boolean;
}
