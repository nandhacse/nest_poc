import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [AuthModule, KafkaModule, QueueModule],
  providers: [AppService],
  exports: [KafkaModule, QueueModule],
  controllers: [AppController]
})
export class AppModule {}
