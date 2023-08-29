import { Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Guide, GuideSchema } from './schemas/Guide';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guide.name, schema: GuideSchema }]),
  ],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
