import { Module } from '@nestjs/common';
import { UserGuidesService } from './user-guides.service';
import { UserGuidesController } from './user-guides.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGuide, UserGuideSchema } from './schemas/UserGuide';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserGuide.name, schema: UserGuideSchema}])
  ],
  controllers: [UserGuidesController],
  providers: [UserGuidesService],
})
export class UserGuidesModule {}
