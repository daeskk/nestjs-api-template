import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RedisModule } from './redis/redis.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [RabbitmqModule, RedisModule, LoggerModule]
})
export class CommonModule {}
