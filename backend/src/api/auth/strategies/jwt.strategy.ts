import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserDto } from '../../user/dtos/user.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly _configService: ConfigService,
    public readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate({
    iat,
    exp,
    id,
    isRefresh,
  }: {
    iat: number;
    exp: number;
    id: number;
    isRefresh: boolean;
  }): Promise<UserDto> {
    const timeDiff = exp - iat;

    if (isRefresh) throw new UnauthorizedException();

    if (timeDiff <= 0) throw new UnauthorizedException();

    const user = await this._userService.getUserById(id);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
