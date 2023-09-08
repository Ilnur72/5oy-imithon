import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guide, GuideSchema } from '../guides/schemas/Guide';
import { User, UserSchema } from '../users/schemas/User';
import { UserGuide, UserGuideSchema } from './schemas/UserGuide';
import { UserGuidesController } from './user-guides.controller';
import { UserGuidesService } from './user-guides.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserGuide.name, schema: UserGuideSchema },
      { name: User.name, schema: UserSchema },
      { name: Guide.name, schema: GuideSchema },
    ]),
  ],
  controllers: [UserGuidesController],
  providers: [UserGuidesService],
})
export class UserGuidesModule {}
