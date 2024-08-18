import { z } from 'zod';

export const createTagSchema = z.object({
  tag: z.string(),
});

export type createTagDto = z.infer<typeof createTagSchema>;
