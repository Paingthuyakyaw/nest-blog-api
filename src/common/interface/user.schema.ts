import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type createUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type updateUserDto = z.infer<typeof updateUserSchema>;

//====================  user Login  ====================//
export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type userLoginDto = z.infer<typeof userLoginSchema>;
