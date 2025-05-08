import { z } from 'zod';

// Zod validation schema for Comment
export const makeCommentValidationSchema = z.object({
  body: z.object({
    article: z.string().min(1, 'Article ID is required'), // MongoDB ObjectId as string
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').optional(),
    content: z.string().min(1, 'Content is required'),
    approved: z.boolean().optional(), // optional because it has a default
  }),
});
// Zod validation schema for Comment
export const updateCommentValidationSchema = z.object({
  body: z.object({
    article: z.string().min(1, 'Article ID is required').optional(), // MongoDB ObjectId as string
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email format').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    approved: z.boolean().optional(), // optional because it has a default
  }),
});
