import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OauthService extends PassportStrategy(Strategy, 'oauth2') {
  constructor() {
    super({
      authorizationURL: process.env.OAUTH2_AUTH_URL,
      tokenURL: process.env.OAUTH2_TOKEN_URL,
      clientID: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      callbackURL: process.env.OAUTH2_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return { accessToken, profile };
  }

  async login() {
    return { message: 'OAuth2 login initiated' };
  }
}
