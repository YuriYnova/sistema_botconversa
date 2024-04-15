import {Catch, ArgumentsHost} from '@nestjs/common';
import {BaseExceptionFilter} from '@nestjs/core';

@Catch()
export class GlobalExceptionMiddleware extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error('Service error');
    console.log(exception.response);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // Sends response back to botconversa Chat using the Response format:
    // https://botconversachat.dev/docs/connect/#Response
    response.status(500).json({error: 'Service error'});
  }
}
