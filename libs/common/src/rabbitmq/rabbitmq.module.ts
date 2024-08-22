import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RMQ_KEY } from './rabbitmq.constants';
import { RabbitMqService } from './rabbitmq.service';

@Global()
@Module({
  providers: [
    {
      provide: RMQ_KEY,
      useFactory: async (configService: ConfigService) => {
        const connection: RabbitMqService = await RabbitMqService.createConnection({
          uri: configService.get<string>('RABBIT_MQ_URI'),
        });
        return connection;
      },
      inject: [ConfigService],
    },
  ],
})
export class RabbitmqModule {}
