import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { connect, Channel, Connection, ConsumeMessage } from 'amqplib';
import { rabbitmqConstants } from 'src/shared/constants/rabbitmq.constants';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;

  async onModuleInit() {
    await this.initialize();
  }

  async onModuleDestroy() {
    await this.close();
  }

  async initialize() {
    this.connection = await connect(
      `amqp://${rabbitmqConstants.user}:${rabbitmqConstants.pass}@${rabbitmqConstants.host}:${rabbitmqConstants.port}`,
    );
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('notify-emails', { durable: true });
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }

  async sendToNotifyQueue(message: any) {
    await this.channel.sendToQueue(
      'notify-emails',
      Buffer.from(JSON.stringify(message)),
    );
  }

  async sendToQueue(queueName: string, message: any) {
    await this.channel.assertQueue(queueName, { durable: true });
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async consume(queueName: string, callback: (message: any) => void) {
    await this.channel.assertQueue(queueName, { durable: true });
    await this.channel.consume(
      queueName,
      (message: ConsumeMessage | null) => {
        if (message) {
          const content = JSON.parse(message.content.toString());
          callback(content);
        }
      },
      { noAck: true },
    );
  }
}
