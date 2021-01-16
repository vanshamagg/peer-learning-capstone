import 'dotenv/config';
import { Sequelize } from 'sequelize';
import 'colors';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  logging: false,
});

// some preflight
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the Db Established'.bold.white);
    await sequelize.sync({ alter: true });
    console.log('All models synchronized'.bold.white);
  } catch (err) {
    console.log(err.message.bold.red);
  }
})();

const db = {};

// importing Models asynchronously
(async () => {
  try {
    
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.User = (await import('./User.model')).default(db.sequelize, db.Sequelize);
} catch (error) {
      console.log(error.message.red.bold)
  }
})();

export default db;
