import { Types } from 'mongoose';

export interface IComment {
  article: Types.ObjectId; // Reference to News
  name: string;
  email?: string;
  content: string;
  approved?: boolean;
}
