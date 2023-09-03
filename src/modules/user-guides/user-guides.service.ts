import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';
import { UpdateUserGuideDto } from './dto/update-user-guide.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserGuide } from './schemas/UserGuide';
import { Model } from 'mongoose';
import { Guide } from '../guides/schemas/Guide';
import { User } from '../users/schemas/User';
import { CreateBulk } from './dto/create-bulk.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UserGuidesService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(UserGuide.name) private userGuideModel: Model<UserGuide>,
    @InjectModel(Guide.name) private guideModel: Model<Guide>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(data: CreateUserGuideDto) {
    const existUser = await this.userModel.findById(data.user_id);
    const existGuid = await this.guideModel.findById(data.guide_id);
    if (!existUser)
      throw new NotFoundException(
        `${data.user_id} bunday id li User topilmadi.`,
      );
    if (!existGuid)
      throw new NotFoundException(
        `${data.guide_id} bunday id li Guide topilmadi.`,
      );

    const result = await this.userGuideModel.create(data);

    return { data: result };
  }

  async createRead(id: string) {
    const existing = await this.userGuideModel.findById(id);
    if (!existing) throw new NotFoundException('User Guide topilmadi.');
    existing.completed = true;
    existing.save();
    return { data: existing };
  }

  async createBulk(data: CreateBulk) {
    data.user_id.map(
      async (userGuide) =>
        await this.userGuideModel.create({
          guide_id: data.guide_id,
          user_id: userGuide,
        }),
    );

    return 'Guide muvaffaqiyatli yaratildi.';
  }

  async findAll({ page = { offset: 1, limit: 10 }, filters = {} }) {
    const dbQuery = this.userGuideModel
      .find({ user_id: this.request['user'].id, ...filters })
      .skip((page.offset - 1) * page.limit)
      .limit(page.limit)
      .populate([{ path: 'guide_id', select: '-notify' }])
      // .select('-user_id');

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

  async findOne(id: string) {
    const existing = await this.userGuideModel.findById(id);
    // .populate({ path: 'user' })
    // .populate({ path: 'guide' });

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
