import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [KafkaController],
  providers: [KafkaService],
  exports: [KafkaService],
  imports: [ConfigModule]
})
export class KafkaModule {}
