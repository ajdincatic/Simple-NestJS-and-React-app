import { Post, Body } from '@nestjs/common';
import { InitController } from '../../decorators/init-controller.decorator';
import { ApiKeyAuth } from '../../decorators/api-key-auth.decorator';
import { LoginDto } from '../user/dtos/login.dto';
import { RegisterUserDto } from '../user/dtos/register-user.dto';
import { AuthService } from './auth.service';

@InitController('')
@ApiKeyAuth()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this._authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this._authService.register(registerUserDto);
  }
}
