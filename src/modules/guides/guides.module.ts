import { Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Guide, GuideSchema } from './schemas/Guide';
import { UserGuide, UserGuideSchema } from '../user-guides/schemas/UserGuide';
import { User, UserSchema } from '../users/schemas/User';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guide.name, schema: GuideSchema },
      { name: UserGuide.name, schema: UserGuideSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
