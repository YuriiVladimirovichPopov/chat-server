import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseBody: any = exception.getResponse();
    const errorResponse: any = {
      errorsMessages: [],
    };

    if (status === 400) {
      if (
        responseBody.errorsMessages &&
        Array.isArray(responseBody.errorsMessages)
      ) {
        errorResponse.errorsMessages = responseBody.errorsMessages;
      } else if (responseBody.message) {
        if (Array.isArray(responseBody.message)) {
          responseBody.message.forEach((msg: any) => {
            if (typeof msg === 'string') {
              errorResponse.errorsMessages.push({
                message: msg,
                field: 'unkn',
              });
            }
            if (msg.message && msg.field) {
              errorResponse.errorsMessages.push(msg);
            }
          });
        }
        if (typeof responseBody.message === 'string') {
          errorResponse.errorsMessages.push({
            message: responseBody.message,
            field: responseBody.field ?? 'unknown',
          });
        }
      } else {
        errorResponse.errorsMessages.push({
          message: responseBody.message,
          field: responseBody.field,
        });
      }

      response.status(status).send(errorResponse);
    } else if (status === 404) {
      if (
        responseBody.errorsMessages &&
        Array.isArray(responseBody.errorsMessages)
      ) {
        errorResponse.errorsMessages = responseBody.errorsMessages;
      } else if (responseBody.message) {
        if (Array.isArray(responseBody.message)) {
          responseBody.message.forEach((msg: any) => {
            if (typeof msg === 'string') {
              errorResponse.errorsMessages.push(msg);
            }
            if (msg.message && msg.field) {
              errorResponse.errorsMessages.push(msg);
            }
          });
        }
        if (typeof responseBody.message === 'string') {
          errorResponse.errorsMessages.push({
            message: responseBody.message,
            field: responseBody.field,
          });
        }
      } else {
        errorResponse.errorsMessages.push({
          message: 'Invalid request',
          field: responseBody.field,
        });
      }

      response.status(status).send(errorResponse);
    } else {
      errorResponse.statusCode = status;
      errorResponse.timestamp = new Date().toISOString();
      errorResponse.path = request.url;

      response.status(status).json(errorResponse);
    }
  }
}
