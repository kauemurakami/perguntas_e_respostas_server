const Sequelize = require('sequelize')
const connection = require('../database/database')

const Answer = connection.define(
  'answer', {
    answer: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    questionId: {

      type: Sequelize.INTEGER,
      allowNull: false

    }
  }
)

Answer.sync({force: false}).then(()=> console.log('tabela criada answer'))

module.exports = Answer