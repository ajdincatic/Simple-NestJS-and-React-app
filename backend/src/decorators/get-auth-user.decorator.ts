import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../api/user/dtos/user.dto';

export const GetAuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
