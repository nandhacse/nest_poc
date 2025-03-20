import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(private configService: ConfigService) {
    const config = this.getKafkaConfig();
    // this.kafka = new Kafka({
    //   clientId: 'nestjs-app',
    //   brokers: [''+config.broker], // Replace with actual broker URL
    //   ssl: true,
    //   sasl: {
    //     mechanism: 'plain',
    //     username: ''+config.username,
    //     password: ''+config.password,
    //   },
    // });

    // this.producer = this.kafka.producer();
    // this.consumer = this.kafka.consumer({ groupId: 'nestjs-group' });
  }

  async onModuleInit() {
    // await this.producer.connect();
    // await this.consumer.connect();
    console.log('Connected to Kafka');
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async consumeMessages(topic: string) {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message: ${message.value?.toString()}`);
      },
    });
  }

  getKafkaConfig() {
    const broker = this.configService.get<string>('KAFKA_BROKER');
    const username = this.configService.get<string>('KAFKA_USERNAME');
    const password = this.configService.get<string>('KAFKA_PASSWORD');

    return { broker, username, password };
  }

  async onModuleDestroy() {
    // await this.producer.disconnect();
    // await this.consumer.disconnect();
  }
}
