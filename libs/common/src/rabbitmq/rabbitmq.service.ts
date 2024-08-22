import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { Message } from 'amqplib';
import { RabbitMqExchangeType } from './rabbitmq.constants';
import { IRabbitMqModuleOptions } from './rabbitmq.interfaces';

@Injectable()
export class RabbitMqService implements OnModuleDestroy {
  private readonly loggerService = new Logger(RabbitMqService.name);

  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private options: IRabbitMqModuleOptions;
  private exchangeAssertMapping: Map<string, boolean> = new Map<string, boolean>();

  constructor(options: IRabbitMqModuleOptions) {
    this.options = options;
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }

  public static async createConnection(options: IRabbitMqModuleOptions): Promise<RabbitMqService> {
    const rmqService = new RabbitMqService(options);
    await rmqService.initialize();

    return rmqService;
  }

  private async initialize(): Promise<void> {
    this.connection = await amqp.connect(this.options.uri);
    this.channel = await this.connection.createChannel();
  }

  public async createQueue(
    queue: string,
    options: amqp.Options.AssertQueue,
  ): Promise<amqp.Replies.AssertQueue> {
    return await this.channel.assertQueue(queue, options);
  }

  public async createQueueWithExchange(
    queue: string,
    options: amqp.Options.AssertQueue,
    exchange: string,
    routingKey?: string,
  ): Promise<void> {
    await this.createQueue(queue, options);

    await this.channel.bindQueue(queue, exchange, routingKey);
  }

  public async createExchange(
    exchange: string,
    type: string,
    options: amqp.Options.AssertExchange,
  ): Promise<amqp.Replies.AssertExchange> {
    return await this.channel.assertExchange(exchange, type, options);
  }

  public async createAnonymousQueue(exchange: string): Promise<string> {
    const queue = await this.channel.assertQueue('', { exclusive: true });
    const { queue: queueName } = queue;
    await this.channel.bindQueue(queueName, exchange, '');

    return queueName;
  }

  async publishInQueue(queue: string, message: string, priority: number = 1) {
    return this.channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
      priority,
    });
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
    priority: number = 1,
  ): Promise<boolean> {
    await this.createExchangeIfNotExists(exchange);

    return this.channel.publish(exchange, routingKey, Buffer.from(message), {
      persistent: true,
      priority,
    });
  }

  private async createExchangeIfNotExists(
    exchange: string,
    type: RabbitMqExchangeType = RabbitMqExchangeType.Fanout,
  ): Promise<void> {
    try {
      if (this.exchangeAssertMapping.has(exchange) === false) {
        await this.channel.assertExchange(exchange, type, {
          durable: true,
        });
        this.exchangeAssertMapping.set(exchange, true);
      }
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  async consume(queue: string, callback: (message: Message) => void) {
    this.channel.prefetch(1);

    return this.channel.consume(
      queue,
      async (message: any) => {
        await callback(message);
        this.channel.ack(message);
      },
      {
        noAck: false,
      },
    );
  }
}
