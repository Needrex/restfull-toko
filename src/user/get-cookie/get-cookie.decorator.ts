import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.cookies?.[data] : req.cookies;
  },
);
