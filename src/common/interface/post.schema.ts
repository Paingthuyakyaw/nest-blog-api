import { z } from 'zod';

//==================== 　create-schema  ====================//
export const createPostSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.any(),
  })
  .required();

export type createPostDto = z.infer<typeof createPostSchema>;

//====================  update-schema  ====================//
export const updatePostScheam = z.object({
  title: z.string(),
  description: z.string(),
});

export type updatePostDto = z.infer<typeof updatePostScheam>;
