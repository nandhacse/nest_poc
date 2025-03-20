import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('process')
  async processAuth() {
    return this.authService.processAuthData();
  }

  @Get('api-key')
  async getApiKey() {
    return this.authService.fetchApiKey();
  }

  @Get("/v2")
  getUsersV2() {
    return [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
      { id: 3, name: 'User3' },
    ];
  }
}
