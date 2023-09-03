import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserGuidesService } from './user-guides.service';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';
import { UpdateUserGuideDto } from './dto/update-user-guide.dto';
import { FindUserGuideDto } from './dto/find-userGuide.dto';
import { CreateBulk } from './dto/create-bulk.dto';
import { SetRoles } from '../auth/set-roles.decorator';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { HasRole } from 'src/shared/guards/has-roles.guard';
import { UserRole } from 'src/shared/types/enums';

@SetRoles(UserRole.ADMIN)
@UseGuards(IsLoggedIn, HasRole)
@Controller('user-guides')
export class UserGuidesController {
  constructor(private readonly userGuidesService: UserGuidesService) {}

  @Post()
  create(@Body() data: CreateUserGuideDto) {
    return this.userGuidesService.create(data);
  }

  @Post(':id/read')
  createRead(@Param('id') id: string) {
    return this.userGuidesService.createRead(id);
  }

  @Post('bulk')
  createBulk(@Body() data: CreateBulk) {
    return this.userGuidesService.createBulk(data);
  }

  @Get()
  findAll(@Query() findUserGuideDtop: FindUserGuideDto) {
    return this.userGuidesService.findAll(findUserGuideDtop);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGuidesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserGuideDto) {
    return this.userGuidesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGuidesService.remove(id);
  }
}
