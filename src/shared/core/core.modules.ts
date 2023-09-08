import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import configuration, { IDatabaseConfig } from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { host, port, name } = configService.get<IDatabaseConfig>('db');
        return {
          uri: `mongodb://${host}:${port}/${name}`,
        };
      },
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: '24h',
          },
          verifyOptions: {
            ignoreExpiration: false,
          },
        };
      },
    }),
  ],
  exports: [ConfigModule, MongooseModule, JwtModule],
})
export class CoreModule {}
