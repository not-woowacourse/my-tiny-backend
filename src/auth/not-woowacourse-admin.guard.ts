import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class NotWoowacourseAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const password = request.headers['Not-Woowacourse-Admin-Password'];

    // TODO: password must be stored in .env
    return password === 'kucc-2024';
  }
}
