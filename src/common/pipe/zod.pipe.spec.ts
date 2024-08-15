import { createPostSchema } from 'src/common/interface/post.schema';
import { ZodValidationPipe } from './zod.pipe';

describe('PostPipe', () => {
  it('should be defined', () => {
    expect(new ZodValidationPipe(createPostSchema)).toBeDefined();
  });
});
