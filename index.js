const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Question = require('./models/question')
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
  const questions = await Question.findAll()
  res.send(questions)
})

app.get('/perguntar',(req,res)=>{
  res.render('perguntar')
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
      // res.send('formulário recebido! titulo ' + title + ' descricao '+ description)
  })
})

app.listen(8000, ()=> { console.log('app rodando') })