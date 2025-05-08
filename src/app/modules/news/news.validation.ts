import { z } from 'zod';
// create zod validation schema defination
export const createNewsZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    slug: z.string().min(1, { message: 'Slug is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    summary: z.string().optional(),

    author: z
      .string()
      .regex(/^[a-fA-F0-9]{24}$/, {
        message: 'Invalid author ObjectId',
      })
      .optional(),

    category: z
      .string()
      .regex(/^[a-fA-F0-9]{24}$/, {
        message: 'Invalid category ObjectId',
      })
      .optional(),

    tags: z
      .array(
        z.string().regex(/^[a-fA-F0-9]{24}$/, {
          message: 'Invalid tag ObjectId',
        })
      )
      .optional(),

    thumbnail: z
      .string({ required_error: 'Thumnail image is required' })
      .optional(),

    published: z.boolean().optional(),
    views: z.number().int().nonnegative().optional(),
  }),
});
// update zod validation schema defination
export const updateNewsZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    slug: z.string().min(1, { message: 'Slug is required' }).optional(),
    content: z.string().min(1, { message: 'Content is required' }).optional(),
    summary: z.string().optional().optional(),
    author: z
      .string()
      .regex(/^[a-fA-F0-9]{24}$/, {
        message: 'Invalid author ObjectId',
      })
      .optional(),

    category: z
      .string()
      .regex(/^[a-fA-F0-9]{24}$/, {
        message: 'Invalid category ObjectId',
      })
      .optional(),

    tags: z
      .array(
        z.string().regex(/^[a-fA-F0-9]{24}$/, {
          message: 'Invalid tag ObjectId',
        })
      )
      .optional(),

    thumbnail: z.string().optional(),

    published: z.boolean().optional(),
    views: z.number().int().nonnegative().optional(),
  }),
});
