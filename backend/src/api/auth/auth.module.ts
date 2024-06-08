import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeyStrategy } from './strategies/auth-header-api-key.strategy';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../user/entities/client.entity';
import { User } from '../user/entities/user.entity';
import { Photo } from '../user/entities/photo.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // register ORM repositories
    TypeOrmModule.forFeature([User, Photo, Client]),
    // register jwt auth
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        secret: _configService.get('JWT_SECRET_KEY'),
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
