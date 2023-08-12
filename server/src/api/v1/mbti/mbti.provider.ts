import { DataSource } from 'typeorm';
import { Mbti } from './mbti.entity';

export const MbtiProviders = [
  {
    provide: 'MBTI_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Mbti),
    inject: ['DATA_SOURCE'],
  },
];
