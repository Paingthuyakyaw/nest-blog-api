import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class PostPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      console.log({ metadata: metadata.metatype });

      if (error instanceof ZodError) {
        const errorMessage = error.issues.map((isu) => {
          return {
            message: `${isu.path[0]} is invalid`,
          };
        });
        throw new BadRequestException({
          success: false,
          statusCode: 400,
          errors: errorMessage,
        });
      } else {
        console.error('Unexpected error:', error);
        throw new BadRequestException('Unexpected error');
      }
    }
  }
}
