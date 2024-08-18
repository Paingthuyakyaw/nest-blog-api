import { z } from 'zod';

//==================== 　create-schema  ====================//
export const createPostSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.any().optional(),
    tagId: z.array(z.number()),
  })
  .required();

export type createPostDto = z.infer<typeof createPostSchema>;

//====================  update-schema  ====================//
export const updatePostScheam = z.object({
  title: z.string(),
  description: z.string(),
  image: z.any(),
});

export type updatePostDto = z.infer<typeof updatePostScheam>;
