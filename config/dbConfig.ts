import { Dialect } from 'sequelize';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} from './envConfig';

export default {
  production: {
    dialect: 'postgres' as Dialect,
    logging: false,
    host: DATABASE_HOST,
    name: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
  },
  development: {
    dialect: 'sqlite' as Dialect,
    storage: './sqlite/development.db',
    logging: console.log,
  },
  test: {
    dialect: 'sqlite' as Dialect,
    storage: ':memory:',
    logging: false,
  },
};
