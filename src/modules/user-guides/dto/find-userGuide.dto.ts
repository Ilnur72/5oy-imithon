import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { OffsetPaginationDto } from 'src/shared/dto/offset-pagination.dto';

export class FilterUsersDto {
  @IsOptional()
  completed?: boolean;
}

export class FindUserGuideDto {
  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterUsersDto)
  filters?: FilterUsersDto;
}
