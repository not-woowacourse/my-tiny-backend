import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NotWoowacourseAdminGuard } from 'src/auth/not-woowacourse-admin.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@UseGuards(NotWoowacourseAdminGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
}
