import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [KafkaModule, QueueModule]
})
export class AuthModule {}
