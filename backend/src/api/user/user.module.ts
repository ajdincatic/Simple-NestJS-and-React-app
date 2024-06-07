import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Client } from './entities/client.entity';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [
    // register ORM repositories
    TypeOrmModule.forFeature([User, Client, Photo]),
    // register jwt auth
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        secret: _configService.get('JWT_SECRET_KEY'),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class UserModule {}
