import { Post, Body, Get, Req } from '@nestjs/common';
import { InitController } from '../../decorators/init-controller.decorator';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginDto } from './dtos/login.dto';
import { GetAuthUser } from '../../decorators/get-auth-user.decorator';
import { JwtAndRolesGuard } from '../../decorators/jwt-roles-guard.decorator';
import { UserDto } from './dtos/user.dto';
import { ApiKeyAuth } from '../../decorators/api-key-auth.decorator';

@InitController('user')
@ApiKeyAuth()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this._userService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this._userService.register(registerUserDto);
  }

  @Get('me')
  @JwtAndRolesGuard()
  async getAuthUser(@Req() req: any, @GetAuthUser() authUser: UserDto) {
    return this._userService.me(req, authUser);
  }
}
