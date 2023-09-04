import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGuide, UserGuideSchema } from '../user-guides/schemas/UserGuide';
import { User, UserSchema } from '../users/schemas/User';
import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';
import { Guide, GuideSchema } from './schemas/Guide';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guide.name, schema: GuideSchema },
      { name: UserGuide.name, schema: UserGuideSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
