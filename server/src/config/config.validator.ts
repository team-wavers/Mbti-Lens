import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import * as glob from 'glob';
import * as path from 'path';

const getEnvFilePath = () => {
  const nodeEnv = process.env.NODE_ENV?.toLowerCase();

  if (!nodeEnv) {
    throw new Error(
      'NODE_ENV is undefined. Please set the NODE_ENV environment variable.',
    );
  }

  const envModes = ['dev', 'prod', 'test', 'local'];
  const mode = envModes.find((mod) => nodeEnv.startsWith(mod));

  if (!mode) {
    throw new Error(`Invalid NODE_ENV value: ${nodeEnv}`);
  }

  const currentDir = process.cwd();
  let envFile: string | null = null;

  glob.sync(`.env.${mode}*`, { cwd: currentDir }).forEach((file) => {
    if (!envFile) {
      envFile = file;
    }
  });

  if (envFile) {
    if (!glob.sync(path.resolve(currentDir, envFile)).length) {
      throw new Error(`No environment file found for NODE_ENV: ${nodeEnv}`);
    }
  } else {
    throw new Error(`No file starting with .env.${mode} found.`);
  }

  return envFile;
};

const envFilePath = getEnvFilePath();

export const CONFIG_VALIDATOR: ConfigModuleOptions = {
  validationSchema: Joi.object({
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_SCHEMA: Joi.string().required(),
    KAKAO_API_KEY: Joi.string().required(),
    KAKAO_CALLBACK_URL: Joi.string().required(),
    REDIRECT_URL: Joi.string().required(),
  }),
  isGlobal: true,
  cache: true,
  envFilePath: envFilePath,
};

// dev, develop, development = .env.dev로 실행되게끔
// prod, production = .env.prod로 실행되게끔
