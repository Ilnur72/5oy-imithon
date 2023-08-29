import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserGuideDocument = HydratedDocument<UserGuide>;

@Schema({
  versionKey: false,
})
export class UserGuide {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'guides',
  })
  guide_id: string;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'userGuides',
  })
  userGuide_id: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  completed: boolean;
}

export const UserGuideSchema = SchemaFactory.createForClass(UserGuide);

UserGuideSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
