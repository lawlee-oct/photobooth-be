import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttpException
      ? (exception.getResponse() as
          | string
          | { message?: string | string[]; [key: string]: unknown })
      : undefined;

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : Array.isArray(errorResponse?.message)
          ? errorResponse?.message.join(', ')
          : (errorResponse?.message as string) ||
            (isHttpException
              ? (exception as HttpException).message
              : 'Internal server error');

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
