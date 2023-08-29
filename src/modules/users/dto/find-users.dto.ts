import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OffsetPaginationDto } from 'src/shared/dto/offset-pagination.dto';
import { SortOrder, UserRole } from 'src/shared/types/enums';

export class SortUsersDto {
  @IsOptional()
  @IsEnum(['age', 'id'])
  by?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}

export class FilterUsersDto {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class FindUsersDto {
  @IsOptional()
  @IsString()
  q?: string;

  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortUsersDto)
  sort?: SortUsersDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterUsersDto)
  filters?: FilterUsersDto;
}
