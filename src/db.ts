import { Sequelize } from 'sequelize';
import { NODE_ENV } from '../config/envConfig';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import config from '../config/dbConfig';

const sequelize = new Sequelize(
  config[NODE_ENV as 'production' | 'development' | 'test'],
);

export { sequelize };
