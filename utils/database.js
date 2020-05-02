const Sequelize = require("sequelize");

const dbName = "book_store";
const dbUserName = "root";
const dbPassword = "";
const connectionDialect = "mysql";

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  dialect: connectionDialect,
});

module.exports = sequelize;
