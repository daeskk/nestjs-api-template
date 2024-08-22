import * as amqp from 'amqplib';

export interface IRabbitMqModuleObject {
  exchangeName?: string;
  queueName?: string;
  exchangeType?: 'fanout' | 'direct' | 'topic';
  exchangeOptions?: amqp.Options.AssertExchange;
  queueOptions?: amqp.Options.AssertQueue;
}

export interface IRabbitMqModuleOptions {
  uri: string;
}
