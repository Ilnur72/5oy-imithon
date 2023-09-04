import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25, {
    message: 'First name 25 ta belgidan oshmasligi kerak.',
  })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25, {
    message: 'Last name 25 ta belgidan oshmasligi kerak.',
  })
  last_name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(16, {
    message: "Age 16 va 60 oralig'ida bo'lishi kerak.",
  })
  @Max(60, {
    message: "Age 16 va 60 oralig'ida bo'lishi kerak.",
  })
  age: number;

  @IsNotEmpty()
  @IsEnum(['admin', 'employee'], {
    message: "Role admin yoki employee bo'lishi kerak.",
  })
  role: 'admin' | 'employee';

  @IsNotEmpty()
  @IsString()
  @MaxLength(25, {
    message: 'Username 25 ta belgidan oshmasligi kerak.',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Password minimum 8 ta bo'lishi kerak." })
  password: string;
}
