import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const sequelize = new Sequelize({
    dialect: "mysql",
    host: MYSQL_HOST,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
});

export default sequelize;
