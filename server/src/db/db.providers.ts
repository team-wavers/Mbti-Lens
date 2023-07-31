import { DataSource } from 'typeorm';

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
