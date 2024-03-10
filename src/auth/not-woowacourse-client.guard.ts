import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class NotWoowacourseClientGuard implements CanActivate {
  constructor(
    @Inject(ClientsService)
    private readonly clientsService: ClientsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const name = request.headers['Not-Woowacourse-Client-Name'.toLowerCase()];

    const client = await this.clientsService.findOneByName(name);

    return client !== null;
  }
}
