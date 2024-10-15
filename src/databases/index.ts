import Sequelize from 'sequelize';

import { logger } from '@utils/logger';
import { applyRelations } from '@/relation/relations';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, } from '@config';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected.');
  })
  .catch(err => {
    console.log('Error in database connection: ', err);
  });

let DB: any = {};

try {
  DB = {
    // don't move the sequence
    sequelize, // connection instance (RAW queries)
    Sequelize, // library

  };
  applyRelations(DB);

  sequelize.sync({ alter: false }) // force: true will drop the table if it already exists
    .then(async () => {
      // Run seeding after database synchronization
    })
    .catch(error => {
      console.error('Error during database synchronization:', error);
    });

} catch (error) {
  logger.error('Error in model initalization:', error);
}

export default DB;
