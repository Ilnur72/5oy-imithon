import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsNumber()
  age: number;
  
  @IsEnum(['admin', 'employee'])
  role: 'admin' | 'employee'

  @IsString()
  username: string;

  @IsString()
  password: string;

}
