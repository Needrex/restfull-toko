import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.params?.[data] : req.params;
  },
);
