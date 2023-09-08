import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SortOrder } from 'src/shared/types/enums';
import { UserGuide } from '../user-guides/schemas/UserGuide';
import { User } from '../users/schemas/User';
import { CreateGuideDto } from './dto/create-guide.dto';
import { FindGuidesDto } from './dto/find-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './schemas/Guide';

@Injectable()
export class GuidesService {
  constructor(
    @InjectModel(Guide.name) private guideModel: Model<Guide>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserGuide.name) private userGuideModel: Model<UserGuide>,
  ) {}

  async create(data: CreateGuideDto) {
    const result = await this.guideModel.create(data);
    const usersList = await this.userModel.find();
    if (data.notify) {
      const guidePromises = usersList.map(async (user) => {
        await this.userGuideModel.create({
          user_id: user.id,
          guide_id: result.id,
        });
      });
      await Promise.all(guidePromises);
    }
    return { data: result };
  }

  async findAll({
    q,
    sort = { by: '_id', order: SortOrder.DESC },
    page,
  }: FindGuidesDto) {
    const search: any = {};
    if (q) {
      search.title = { $regex: q, $options: 'i' };
    }

    const dbQuery = this.guideModel
      .find(search)
      .sort({ ['_' + sort.by]: sort.order })
      .skip((page.offset - 1) * page.limit)
      .limit(page.limit);

    const result = await dbQuery;
    const total = await this.guideModel.find(search).countDocuments({}).exec();

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
    const existing = await this.guideModel.findById(id);
    const userGuideTotal = await this.userGuideModel
      .find({ guide_id: existing.id })
      .countDocuments({})
      .exec();
    if (!existing) throw new NotFoundException('Guide topilmadi.');

    return { data: { ...existing.toObject(), revisions: userGuideTotal } };
  }

  async update(id: string, data: UpdateGuideDto) {
    const existing = await this.guideModel.findById(id);
    const newUserGuide = await this.userGuideModel.find({ guide_id: id });

    if (!existing) throw new NotFoundException('Guide topilmadi.');
    if (data.notify) {
      newUserGuide.forEach((userGuide) => {
        userGuide.completed = false;
        userGuide.save();
      });
    }
    const result = await this.guideModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return { data: result };
  }

  async remove(id: string) {
    const existing = await this.guideModel.findById(id);

    if (!existing) throw new NotFoundException('Guide topilmadi.');
    const result = await this.guideModel.findByIdAndDelete(id);
    return { data: result };
  }
}
