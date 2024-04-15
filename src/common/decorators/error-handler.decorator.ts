import { SetMetadata } from '@nestjs/common';

export const ErrorHandler = () => SetMetadata('errorHandler', true);
