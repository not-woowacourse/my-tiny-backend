import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientsService } from '@/clients/clients.service';
import { NOT_WOOWACOURSE_CLIENT_NAME_KEY } from '@/shared/constants/http-header';

@Injectable()
export class NotWoowacourseClientGuard implements CanActivate {
  constructor(
    @Inject(ClientsService)
    private readonly clientsService: ClientsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const name = request.headers[NOT_WOOWACOURSE_CLIENT_NAME_KEY];

    const client = await this.clientsService.findOneByName(name);

    return client !== null;
  }
}
