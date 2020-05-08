import express from 'express'
import cors from 'cors'
import bp from 'body-parser'
import DbContext from "./db/dbconfig"

const port = 3000

let server = express()

DbContext.connect()

server.use(express.static(__dirname + '/../client/dist'))

let whitelist = ['http://localhost:8080'];
let corsOptions = {
  origin: function (origin, callback) {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))


server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())


import AuthController from './controllers/AuthController'
import Session from "./middleware/session"
server.use(new Session().express)
server.use('/account', new AuthController().router)


import ResultController from './controllers/ResultController'
import PollController from './controllers/PollController'
import QuestionController from './controllers/QuestionController'

server.use('/api/polls', new PollController().router)
server.use('/api/questions', new QuestionController().router)
server.use('/api/results', new ResultController().router)




server.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 400).send({ error: error.message })
})

server.use('*', (req, res, next) => {
  res.status(404).send("Route not found")
})


server.listen(port, () => { console.log(`Server is running on port: ${port}`) })