/* eslint-disable @typescript-eslint/no-namespace */
import * as dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      SERVER_URL: string;
      PORT: number;
      JWT_SECRET: string;
      NODE_ENV: string;
      DATABASE_HOST: string;
      DATABASE_NAME: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_PORT: number;
    }
  }
}

const {
  TOKEN,
  SERVER_URL,
  JWT_SECRET,
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

const PORT = process.env.PORT || 4000;

export {
  TOKEN,
  SERVER_URL,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
};
