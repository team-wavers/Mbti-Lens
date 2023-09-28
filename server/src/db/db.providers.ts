import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const dbProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const postgres = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_SCHEMA'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return postgres.initialize();
    },
  },
];
