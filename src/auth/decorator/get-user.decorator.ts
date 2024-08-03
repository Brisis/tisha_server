import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      if (data) {
        return request.user[data]
      }    
      return request.user;
    } catch (error) {
      throw new ForbiddenException("Login Exception: user not available")
    }
  },
);