import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { HasRole } from 'src/shared/guards/has-roles.guard';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { UserRole } from 'src/shared/types/enums';
import { SetRoles } from '../auth/set-roles.decorator';
import { CreateBulk } from './dto/create-bulk.dto';
import { FindUserGuideDto } from './dto/find-userGuide.dto';
import { UserGuidesService } from './user-guides.service';

@SetRoles(UserRole.ADMIN)
@UseGuards(IsLoggedIn, HasRole)
@Controller('user-guides')
export class UserGuidesController {
  constructor(private readonly userGuidesService: UserGuidesService) {}

  @Post(':id/read')
  createRead(@Param('id') id: string) {
    return this.userGuidesService.createRead(id);
  }

  @Post('bulk')
  createBulk(@Body() data: CreateBulk) {
    return this.userGuidesService.createBulk(data);
  }

  @SetRoles(UserRole.ADMIN ,UserRole.EMPLOYEE)
  @Get()
  findAll(@Query() findUserGuideDtop: FindUserGuideDto) {
    return this.userGuidesService.findAll(findUserGuideDtop);
  }
}
