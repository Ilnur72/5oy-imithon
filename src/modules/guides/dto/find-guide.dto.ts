import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OffsetPaginationDto } from 'src/shared/dto/offset-pagination.dto';
import { SortOrder } from 'src/shared/types/enums';

export class SortGuidesDto {
  @IsOptional()
  @IsEnum(['id'])
  by?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}

export class FindGuidesDto {
  @IsOptional()
  @IsString()
  q?: string;

  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortGuidesDto)
  sort?: SortGuidesDto;
}
