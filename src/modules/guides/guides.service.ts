import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Guide } from './schemas/Guide';
import { Model } from 'mongoose';
import { FindUsersDto } from '../users/dto/find-users.dto';
import { SortOrder } from 'src/shared/types/enums';
import { FindGuidesDto } from './dto/find-guide.dto';

@Injectable()
export class GuidesService {
  constructor(@InjectModel(Guide.name) private guideModel: Model<Guide>) {}

  async create(data: CreateGuideDto) {
    const result = await this.guideModel.create(data);

    return { data: result };
  }

  async findAll({
    q,
    sort = { by: '_id', order: SortOrder.DESC },
    page = { offset: 1, limit: 10 },
  }: FindGuidesDto) {
    const search: any = {};
    if (q) {
      search.title = { $regex: q, $options: 'i' };
    }

    const dbQuery = this.guideModel
      .find(search)
      .sort({ ['_'+sort.by]: sort.order })
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

    if (!existing) throw new NotFoundException('Guide topilmadi.');

    return { data: existing };
  }

  async update(id: string, data: UpdateGuideDto) {
    const existing = await this.guideModel.findById(id);

    if (!existing) throw new NotFoundException('Guide topilmadi.');

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
