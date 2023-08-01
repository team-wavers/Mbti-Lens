import { DataSource } from 'typeorm';

// env 환경변수 처리하기
export const dbProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const postgres = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'jeongdaun',
        password: 'ekdns001',
        database: 'users',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return postgres.initialize();
    },
  },
];
