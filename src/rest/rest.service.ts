import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class RestApiService {
  async request(method: string, url: string, data?: any, headers?: any) {
    const config: AxiosRequestConfig = { method, url, data, headers };
    const response = await axios(config);
    return response.data;
  }
}

