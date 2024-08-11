import { z } from 'zod';

export const createPostSchema = z
  .object({
    title: z.string(),
    description: z.string().min(1, { message: 'description is required' }),
  })
  .required();

export type createPostDto = z.infer<typeof createPostSchema>;
