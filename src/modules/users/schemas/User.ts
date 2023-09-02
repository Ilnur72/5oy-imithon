import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/shared/types/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
})
export class User {
  @Prop({
    type: String,
    required: true,
    // maxlength: 25,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
    // maxlength: 25,
  })
  last_name: string;

  @Prop({
    type: Number,
    required: true,
    // min: 16,
    // max: 60,
  })
  age: number;

  @Prop({
    type: String,
    required: true,
    enum: UserRole,
  })
  role: UserRole;

  @Prop({
    type: String,
    required: true,
    // maxlength: 25,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    // maxlength: 350,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
