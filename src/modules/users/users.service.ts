import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { FindUsersDto } from './dto/find-users.dto';
import { SortOrder } from 'src/shared/types/enums';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto) {
    const existing = await this.userModel.findOne({ username: data.username });
    if (existing)
      throw new BadGatewayException('Foydalanuvchi allaqachon mavjud.');

    const hashedPassword: string = await hash(data.password, 10);
    const result = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });
    return { data: result };
  }

  async findAll({
    q,
    sort = { by: 'updated_at', order: SortOrder.DESC },
    page = { offset: 1, limit: 10 },
    filters = {},
  }: FindUsersDto) {
    // const { ...directFilters } = filters;
    // const filter = { ...directFilters };

    if (q) {
      filters['$or'] = [
        {
          first_name: { $regex: q, $options: 'i' },
        },
        {
          last_name: { $regex: q, $options: 'i' },
        },
      ];
    }

    const dbQuery = this.userModel
      .find(filters)
      .sort({ [sort.by]: sort.order })
      .skip((page.offset - 1) * page.limit)
      .limit(page.limit);

    const result = await dbQuery;
    const total = await this.userModel.countDocuments({}).exec();

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
    const existing = await this.userModel.findById(id);

    if (!existing) throw new NotFoundException('Foydalanuvchi topilmadi.');

    return { data: existing };
  }

  async update(id: string, data: UpdateUserDto) {
    const existing = await this.userModel.findById(id);
    const hashedPassword: any = {};

    if (!existing) throw new NotFoundException('Foydalanuvchi topilmadi.');
    if (data.password) hashedPassword.password = await hash(data.password, 10);
    const result = await this.userModel.findByIdAndUpdate(
      id,
      { ...data, ...hashedPassword },
      { new: true },
    );

    return { data: result };
  }

  async remove(id: string) {
    const existing = await this.userModel.findById(id);

    if (!existing) throw new NotFoundException('Foydalanuvchi topilmadi.');

    const result = await this.userModel.findByIdAndDelete(id);

    return { data: result };
  }
}
