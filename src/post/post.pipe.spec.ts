import { createPostSchema } from 'src/common/interface/post.schema';
import { PostPipe } from './post.pipe';

describe('PostPipe', () => {
  it('should be defined', () => {
    expect(new PostPipe(createPostSchema)).toBeDefined();
  });
});
