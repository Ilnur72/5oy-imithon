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
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

import { SetRoles } from '../auth/set-roles.decorator';
import { HasRole } from 'src/shared/guards/has-roles.guard';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { UserRole } from 'src/shared/types/enums';
import { REQUEST } from '@nestjs/core';

@SetRoles(UserRole.ADMIN)
@UseGuards(IsLoggedIn, HasRole)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(@Query() findUsersDto: FindUsersDto) {
    return this.usersService.findAll(findUsersDto);
  }

  @SetRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get('me')
  findMe() {
    return this.usersService.findOne(this.request['user'].id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @SetRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Patch('me')
  updateMe(@Body() data: UpdateUserDto) {
    return this.usersService.update(this.request['user'].id, data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
