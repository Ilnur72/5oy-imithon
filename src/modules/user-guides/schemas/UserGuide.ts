import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserGuideDocument = HydratedDocument<UserGuide>;

@Schema({
  versionKey: false,
  // toJSON: {
  //   virtuals: true,
  // },
})
export class UserGuide {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Guide',
    required: true,
  })
  guide_id: string;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  completed?: boolean;
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

// UserGuideSchema.virtual('user', {
//   ref: 'User',
//   localField: 'user_id',
//   foreignField: '_id',
//   justOne: true,
// });
// UserGuideSchema.virtual('guide', {
//   ref: 'Guide',
//   localField: 'guide_id',
//   foreignField: '_id',
//   justOne: true,
// });

// export { UserGuideSchema };
