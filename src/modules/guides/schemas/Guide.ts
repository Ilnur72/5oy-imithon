import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuideDocument = HydratedDocument<Guide>;

@Schema({
  versionKey: false,
})
export class Guide {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  notify: boolean;
}

export const GuideSchema = SchemaFactory.createForClass(Guide);

GuideSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
