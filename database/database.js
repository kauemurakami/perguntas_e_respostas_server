const Sequelize = require('sequelize')

const dbName = 'perguntas_e_respostas'
const dbPass = 'root'
const userDb = 'postgres'
const dbConfig = {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
}
const connection = new Sequelize(dbName, userDb, dbPass, dbConfig)

module.exports = connection;
