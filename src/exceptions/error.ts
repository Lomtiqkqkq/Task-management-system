import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ServiceError } from './service.error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number;
    let message: string;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message =
        exception.getResponse() instanceof Object
          ? (exception.getResponse() as any).message || exception.message
          : exception.message;
    } else if (exception instanceof ServiceError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
      this.logger.error(`Unhandled exception: ${exception}`);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(`Unhandled exception: ${exception}`);
    }
    this.logger.error({
      timestamp: new Date().toISOString(),
      path: request.url,
      status,
      message,
    });
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
