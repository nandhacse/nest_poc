import { Injectable } from '@nestjs/common';
import * as SftpClient from 'ssh2-sftp-client';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SftpService {
  private client: SftpClient;

  constructor() {
    this.client = new SftpClient();
  }

  async connect() {
    try {
      const host = process.env.SFTP_HOST || '';
      const port = parseInt(process.env.SFTP_PORT || '22', 10);
      const username = process.env.SFTP_USER || '';
      const password = process.env.SFTP_PASS || '';

      if (!host || !port || !username || !password) {
        throw new Error('Missing SFTP configuration in environment variables.');
      }

      await this.client.connect({
        host,
        port,
        username,
        password,
      });
    } catch (error) {
      console.error('Connection error:', error);
    }
  }

  async uploadFile(localPath: string, remotePath: string) {
    try {
      await this.client.put(localPath, remotePath);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      await this.disconnect();
    }
  }

  async downloadFile(remotePath: string, localPath: string) {
    try {
      await this.client.get(remotePath, localPath);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      await this.disconnect();
    }
  }

  async disconnect() {
    try {
      await this.client.end();
    } catch (error) {
      console.error('Disconnection error:', error);
    }
  }
}
