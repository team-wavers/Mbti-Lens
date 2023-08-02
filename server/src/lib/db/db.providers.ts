import { DataSource } from 'typeorm';

// env 환경변수 처리하기
export const dbProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const postgres = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return postgres.initialize();
    },
  },
];
