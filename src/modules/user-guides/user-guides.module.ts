import { Module } from '@nestjs/common';
import { UserGuidesService } from './user-guides.service';
import { UserGuidesController } from './user-guides.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGuide, UserGuideSchema } from './schemas/UserGuide';
import { User, UserSchema } from '../users/schemas/User';
import { Guide, GuideSchema } from '../guides/schemas/Guide';

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
