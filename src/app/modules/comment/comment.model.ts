import mongoose, { model } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new mongoose.Schema<IComment>(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News',
      required: true,
    },
    name: { type: String, required: true },
    email: String,
    content: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Comment = model<IComment>('Comments', commentSchema);
