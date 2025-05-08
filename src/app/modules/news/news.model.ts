import mongoose, { model } from 'mongoose';
import { INews } from './news.interface';

const newsSchema = new mongoose.Schema<INews>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    summary: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    thumbnail: { type: String, required: true },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const News = model<INews>('News', newsSchema);
