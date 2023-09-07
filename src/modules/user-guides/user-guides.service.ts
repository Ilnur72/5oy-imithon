import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBulk } from './dto/create-bulk.dto';
import { UserGuide } from './schemas/UserGuide';

@Injectable()
export class UserGuidesService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(UserGuide.name) private userGuideModel: Model<UserGuide>,
  ) {}

  async createRead(id: string) {
    const existing = await this.userGuideModel.findById(id);
    if (!existing) throw new NotFoundException('User Guide topilmadi.');
    existing.completed = true;
    existing.save();
    return { data: existing };
  }

  async createBulk(data: CreateBulk) {
    const userGuidePromises = data.user_id.map(async (userGuide) => {
      await this.userGuideModel.create({
        guide_id: data.guide_id,
        user_id: userGuide,
      });
    });

    await Promise.all(userGuidePromises);

    return 'UserGuide muvaffaqiyatli yaratildi.';
  }

  async findAll({ page = { offset: 1, limit: 10 }, filters = {} }) {
    const dbQuery = this.userGuideModel
      .find({ user_id: this.request['user'].id, ...filters })
      .skip((page.offset - 1) * page.limit)
      .limit(page.limit)
      .populate({ path: 'guide', select: 'id title content' })
      .lean({ virtuals: true })
      .select('-user_id')
      .exec();

    const result = await dbQuery;
    const total = await this.userGuideModel
      .find({ user_id: this.request['user'].id, ...filters })
      .countDocuments({})
      .exec();

    return {
      data: result,
      pageInfo: {
        total: total,
        limit: page.limit,
        offset: page.offset,
      },
    };
  }
}
