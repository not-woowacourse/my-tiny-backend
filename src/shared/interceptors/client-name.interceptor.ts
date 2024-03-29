import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { CLIENT_NAME_KEY } from '@/shared/constants/http-header';

@Injectable()
export class ClientNameInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const clientName = request.headers[CLIENT_NAME_KEY];

    request.clientName = clientName;

    return next.handle();
  }
}
