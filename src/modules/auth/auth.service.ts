import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/User';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto) {
    const existing = await this.userModel.findOne({ username });

    if (!existing)
      throw new UnauthorizedException('Username yoki password xato.');

    const match = await compare(password, existing.password);

    if (!match) throw new UnauthorizedException('Username yoki password xato.');

    const token = this.jwtService.sign({
      user: { id: existing._id, role: existing.role },
    });
    return { data: { token: token } };
  }
}
