import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientsService } from '@/clients/clients.service';
import { CLIENT_NAME_KEY } from '@/shared/constants/http-header';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(
    @Inject(ClientsService)
    private readonly clientsService: ClientsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const clientName = request.headers[CLIENT_NAME_KEY];

    const client = await this.clientsService.findOneByName(clientName);

    if (client === null) {
      throw new UnauthorizedException('클라이언트를 찾을 수 없습니다.');
    }

    return true;
  }
}
