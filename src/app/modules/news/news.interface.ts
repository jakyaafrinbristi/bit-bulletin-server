import { Types } from 'mongoose';

export interface INews {
  title: string;
  slug: string;
  content: string;
  summary?: string;
  author?: Types.ObjectId; // references 'User'
  category?: Types.ObjectId; // references 'Category'
  tags?: Types.ObjectId[]; // references multiple 'Tag'
  thumbnail?: string;
  published?: boolean;
  views?: number;
}
