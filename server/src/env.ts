import * as dotenv from 'dotenv';
import * as path from 'path';
import appRoot from 'app-root-path';
import fs from 'fs';
import process from 'process';
import { getOsEnv } from './lib/env/utils';

const config = { path: path.join(appRoot.path, `.env`) };

(() => {
  try {
    if (fs.existsSync(config.path)) {
      //file exists
    } else {
      console.error(JSON.stringify(config));
      process.exit(1);
    }
  } catch (err) {
    console.error(JSON.stringify(config), err);
    process.exit(1);
  }
})();

dotenv.config(config);

/**
 * Environment variables
 */
const env = {
  config: config,
  mysql: {
    type: getOsEnv('DB_TYPE'),
    host: getOsEnv('DB_HOST'),
    port: getOsEnv('DB_PORT'),
    username: getOsEnv('DB_USERNAME'),
    password: getOsEnv('DB_PASSWORD'),
    schema: getOsEnv('DB_SCHEMA'),
  },
  app: {
    name: getOsEnv('APP_NAME'),
    version: pkg.version,
    description: pkg.description,
    port: normalizePort(process.env.APP_PORT),
    cors: {
      origins:
        getOsEnvOptional('APP_CORS_ORIGINS') || getOsEnvOptional('APP_WEB_URL'),
    },
    web: {
      url: getOsEnvOptional('APP_WEB_URL'),
    },
  },
};

export default env;
