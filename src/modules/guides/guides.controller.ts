import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { SetRoles } from '../auth/set-roles.decorator';
import { UserRole } from 'src/shared/types/enums';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { HasRole } from 'src/shared/guards/has-roles.guard';
import { FindUsersDto } from '../users/dto/find-users.dto';

@SetRoles(UserRole.ADMIN)
@UseGuards(IsLoggedIn, HasRole)
@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  create(@Body() data: CreateGuideDto) {
    return this.guidesService.create(data);
  }

  @SetRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get()
  findAll(@Query() findUsersDto: FindUsersDto) {
    return this.guidesService.findAll(findUsersDto);
  }

  @SetRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guidesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateGuideDto) {
    return this.guidesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidesService.remove(id);
  }
}
