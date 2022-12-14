import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {
  JwtHeader,
  SigningKeyCallback,
  verify,
  VerifyErrors,
  VerifyOptions,
} from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const header = context.switchToHttp().getRequest().headers.authorization;
    if (header) {
      const authorization = header.split(' ')[1];
      return this.getData(authorization);
    }
    return false;
  }

  private async getData(token: string): Promise<boolean> {
    const client = jwksClient({
      jwksUri:
        'https://dev-ekzvwhhuz1fzlqp0.us.auth0.com/.well-known/jwks.json',
    });

    const options: VerifyOptions = { algorithms: ['RS256'] };
    const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key?.getPublicKey();
        callback(err, signingKey);
      });
    };

    return new Promise((resolve) => {
      verify(token, getKey, options, (err: VerifyErrors, decoded: any) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }
}
