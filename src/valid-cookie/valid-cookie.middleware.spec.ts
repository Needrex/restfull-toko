import { ValidCookieMiddleware } from './valid-cookie.middleware';

describe('ValidCookieMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidCookieMiddleware()).toBeDefined();
  });
});
