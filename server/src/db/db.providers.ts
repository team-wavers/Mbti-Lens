import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CommentData } from 'src/api/v1/commentdata/commentdata.entity';
import { Users } from 'src/api/v1/users/users.entity';
import { Mbti } from 'src/api/v1/mbti/mbti.entity';

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
        synchronize: true,
      });

      return postgres.initialize();
    },
  },
];
