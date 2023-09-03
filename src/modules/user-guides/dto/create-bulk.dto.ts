import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBulk {
  @IsNotEmpty()
  @IsString()
  guide_id: string;

  @IsNotEmpty()
  @IsArray()
  user_id: [];
}
