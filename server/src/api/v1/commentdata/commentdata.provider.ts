import { DataSource } from 'typeorm';
import { CommentData } from './commentdata.entity';

export const CommentDataProviders = [
  {
    provide: 'COMMENTDATA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CommentData),
    inject: ['DATA_SOURCE'],
  },
];
