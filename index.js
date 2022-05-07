const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Question = require('./models/question')
const Answer = require('./models/answer')
//database
connection.authenticate().then(()=>{
  console.log('conectado com o banco')
}).catch((_)=> {
  console.log(_)
})

// app.set('view engine', 'ejs')
// app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', async (req,res)  => {
  const questions = await Question.findAll({raw: true, order: [
    ['id','DESC']
  ]})
  res.send(questions)
})

app.post('/salvar-pergunta',(req,res)=>{
  var title = req.body.title
  var description = req.body.description
  //const {titulo, descricao} = req.body

  Question.create({
    title: title,
    description: description
    }).then(()=> { 
      console.log('pergunta foi salva garai')
      res.redirect('/')
  })
})

app.get('/pergunta/:id',async (req,res) => {
  const id = req.params.id
  await Question.findOne({
    where: {
      id:id
    }
  }).then((_)=>{ 
    if(_ != undefined){
      Answer.findAll({where: {
        id:_.id
      }, order: [
        ['id', 'DESC']
      ]}).then((answers) =>{
      res.send({question:_, answers:answers})
      })
    }else{
      res.send({"erro": "não encontramos nenhuma pergunta com este id"})
    }
  })
})

app.post('/responder', async(req,res)=> {
  var answer = req.body.answer
  var questionId = req.body.questionId
  Answer.create({
    answer:answer,
    questionId:questionId
  }
  ).then(()=> {
    res.redirect('/pergunta/'+questionId)
  })
})


app.listen(8000, ()=> { console.log('app rodando') })