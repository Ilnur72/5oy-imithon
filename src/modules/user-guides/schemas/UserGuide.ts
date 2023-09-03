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

const UserGuideSchema = SchemaFactory.createForClass(UserGuide);

UserGuideSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

UserGuideSchema.virtual('guide', {
  ref: 'Guide',
  localField: '_id',
  foreignField: 'guide_id',
  justOne: true,
});
// UserGuideSchema.virtual('guide', {
//   ref: 'Guide',
//   localField: 'guide_id',
//   foreignField: '_id',
//   justOne: true,
// });

// UserGuideSchema.virtual('guide', {
//   ref: 'Guide', // Reference to the Guide model
//   localField: 'guide_id',
//   foreignField: '_id',
//   justOne: true, // Set this to true since you want one guide per user guide
//   transform: (doc:any, ret:any) => {
//     return {
//       id: ret._id,
//       title: ret.title,
//       content: ret.content,
//     };
//   },
// });

export { UserGuideSchema };
