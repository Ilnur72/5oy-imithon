import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';
import { UpdateUserGuideDto } from './dto/update-user-guide.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserGuide } from './schemas/UserGuide';
import { Model } from 'mongoose';

@Injectable()
export class UserGuidesService {
  constructor(
    @InjectModel(UserGuide.name) private userGuideModel: Model<UserGuide>,
  ) {}
  async create(data: CreateUserGuideDto) {
    const result = await this.userGuideModel.create(data);
    return { data: result };
  }

  async findAll() {
    const existing = await this.userGuideModel
      .find()
      .populate('user_id');
    return { data: existing };
  }

  async findOne(id: string) {
    const existing = await this.userGuideModel
      .findById(id)
      .populate([{ path: 'user' }])
      .populate({ path: 'guide' });

    if (!existing) throw new NotFoundException('User Guide topilmadi.');

    return { data: existing };
  }

  update(id: string, data: UpdateUserGuideDto) {
    return `This action updates a #${id} userGuide`;
  }

  remove(id: string) {
    return `This action removes a #${id} userGuide`;
  }
}
