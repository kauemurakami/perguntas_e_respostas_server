const Sequelize = require('sequelize')
const connection = require('../database/database')

const Question = connection.define(
  'question',{
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    description:{
      type: Sequelize.TEXT,
      allowNull: false
    }
  }
);
//caso nao exista ele cria, e nao irá forçar caso ela exista (recriar)
Question.sync({force: false}).then(()=> {console.log('tabela criada questions')})

module.exports = Question