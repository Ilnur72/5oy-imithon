import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserGuideDocument = HydratedDocument<UserGuide>;

@Schema({
  versionKey: false,
})
export class UserGuide {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Guide',
    required: true,
  })
  guide_id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  completed?: boolean;
}

const UserGuideSchema = SchemaFactory.createForClass(UserGuide);

UserGuideSchema.virtual('guide', {
  ref: 'Guide',
  localField: 'guide_id',
  foreignField: '_id',
  justOne: true,
  transform: (doc: any, ret: any) => {
    return {
      id: ret._id,
      title: ret.title,
      content: ret.content,
    };
  },
});

UserGuideSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export { UserGuideSchema };
