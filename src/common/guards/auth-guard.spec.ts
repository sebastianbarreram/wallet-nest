import { AuthGuard } from './auth-guard';

describe('TokenGuard', () => {
  let authorizationGuard: AuthGuard;

  beforeEach(() => {
    authorizationGuard = new AuthGuard();
  });

  it('should be defined', () => {
    expect(authorizationGuard).toBeDefined();
  });

});
