import { Sequelize } from 'sequelize-typescript';
import RoleDao from '../dal/dao/RoleDao'
import UserDao from '../dal/dao/UserDao'

export const sequelize = new Sequelize({
  dialect: process.env.DB_LANG as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(`${process.env.DB_PORT}`, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [RoleDao, UserDao],
  define: {
    underscored: true,
  },
  logging: false
});