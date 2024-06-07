import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from './shared/enums/env.enum';
import { PasswordSubscriber } from './shared/entity-subscribers/password-subscriber';
import { AwsModule } from './api/aws/aws.module';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';

@Module({
  imports: [
    // env variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // database config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: _configService.get('DB_HOST'),
        port: _configService.get('DB_PORT'),
        username: _configService.get('DB_USERNAME'),
        password: _configService.get('DB_PASSWORD'),
        database: _configService.get('DB_DATABASE'),
        migrationsRun: false,
        synchronize: true,
        logging: _configService.get('NODE_ENV') === Env.DEV,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        subscribers: [PasswordSubscriber],
      }),
    }),
    // custom modules
    UserModule,
    AwsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
