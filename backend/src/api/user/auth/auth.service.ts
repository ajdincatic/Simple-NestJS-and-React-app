import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {}

  async createToken(user: User): Promise<TokenPayloadDto> {
    try {
      const expiresIn = +this._configService.get('JWT_EXPIRATION_TIME');

      const accessToken = await this._jwtService.signAsync(
        { id: user.id, email: user.email, isRefresh: false },
        {
          expiresIn,
        },
      );

      return new TokenPayloadDto({
        expiresIn,
        accessToken,
      });
    } catch (err) {
      Logger.error(err.message);
    }
  }
}
