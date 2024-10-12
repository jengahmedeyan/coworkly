import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const initDatabase = async (): Promise<void> => {
    try {
      await sequelize.sync();
      console.log('\x1b[32m','Database connected and synced','\x1b[0m');
    } catch (error) {
      console.error('\x1b[41m','Unable to connect to the database:', '\x1b[0m', error);
    }
  };
export default sequelize;
