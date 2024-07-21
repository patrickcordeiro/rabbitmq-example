import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private amqpConnection: AmqpConnection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('publish')
  publisher() {
    this.amqpConnection.publish('amq.direct', 'pagamentos', {
      client: 'Patrick Cordeiro',
      amount: 100000,
    });

    console.log('Mensagem Publicada');
    return { message: 'Mensagem Publicada' };
  }
}
