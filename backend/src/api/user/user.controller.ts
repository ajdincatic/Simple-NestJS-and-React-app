import { Get, Req } from '@nestjs/common';
import { InitController } from '../../decorators/init-controller.decorator';
import { UserService } from './user.service';
import { GetAuthUser } from '../../decorators/get-auth-user.decorator';
import { JwtAndRolesGuard } from '../../decorators/jwt-roles-guard.decorator';
import { UserDto } from './dtos/user.dto';
import { ApiKeyAuth } from '../../decorators/api-key-auth.decorator';
import { Request } from 'express';

@InitController('users')
@ApiKeyAuth()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('me')
  @JwtAndRolesGuard()
  async getAuthUser(@Req() request: Request, @GetAuthUser() authUser: UserDto) {
    return this._userService.me(request, authUser);
  }
}
