import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserGuidesService } from './user-guides.service';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';
import { UpdateUserGuideDto } from './dto/update-user-guide.dto';

@Controller('userguides')
export class UserGuidesController {
  constructor(private readonly userGuidesService: UserGuidesService) {}

  @Post()
  create(@Body() data: CreateUserGuideDto) {
    return this.userGuidesService.create(data);
  }

  @Get()
  findAll() {
    return this.userGuidesService.findAll();
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
