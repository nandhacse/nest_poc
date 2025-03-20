import { Injectable } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import { RedisOptions } from 'ioredis';

const redisConfig: RedisOptions = {
    host: 'localhost', // Change if using a remote Redis
    port: 6379,
};

@Injectable()
export class QueueService {
    private jobQueue: Queue;

  constructor() {
    this.jobQueue = new Queue('job-queue', { connection: redisConfig });

    new Worker(
      'job-queue',
      async (job) => {
        console.log('Processing job:', job.data);
      },
      { connection: redisConfig },
    );
  }

  async addJob(data: any) {
    await this.jobQueue.add('process-job', data);
  }
}
