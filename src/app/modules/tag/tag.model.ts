import mongoose, { model } from 'mongoose';
import { ITag } from './tag.interface';

const tagSchema = new mongoose.Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Tag = model<ITag>('Tag', tagSchema);
