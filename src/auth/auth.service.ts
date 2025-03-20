import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { QueueService } from '../queue/queue.service';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';


@Injectable()
export class AuthService {
    constructor(
        private readonly kafkaService: KafkaService,
        private readonly queueService: QueueService,
      ) {}
      private getPrivateKey(): string {
        const keyPath = path.join(__dirname, '../keys/private.key');
        return fs.readFileSync(keyPath, 'utf8');
      }
    
      async fetchApiKey(): Promise<any> {
        const privateKey = this.getPrivateKey();
    
        // Replace with the actual API URL
        const apiUrl = 'https://example.com/get-api-key';
    
        try {
          const response = await axios.post(apiUrl, { privateKey });
          return response.data;
        } catch (error) {
          console.error('Error fetching API key:', error);
          throw new Error('Failed to fetch API key');
        }
      }
      async processAuthData() {
        const apiData = { key: '12345', client: 'NestJS-App' };
    
        // Send message to Kafka
        await this.kafkaService.sendMessage('auth-topic', apiData);
    
        // Add job to queue
        await this.queueService.addJob(apiData);
    
        return { message: 'Data sent to Kafka and added to queue' };
      }
}
