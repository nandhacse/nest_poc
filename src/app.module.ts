import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { QueueModule } from './queue/queue.module';
import { RestApiService } from './rest/rest.service';
import { OauthService } from './oauth/oauth.service';
import { SftpService } from './sftp/sftp.service';

@Module({
  imports: [AuthModule, KafkaModule, QueueModule],
  providers: [AppService, RestApiService, OauthService, SftpService],
  exports: [KafkaModule, QueueModule],
  controllers: [AppController]
})
export class AppModule {}
