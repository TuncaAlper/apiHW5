const express = require('express')
const bodyParser = require('body-parser')
const customersRouter = require('./customers/routes')
const companyRouter = require('./companies/routes')
const loginRouter = require('./auth/routes')
const usersRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4000

// app
//   .use(bodyParser.json())
//   .use(customersRouter, companyRouter, loginRouter, usersRouter)
//   .listen(port, () => console.log(`Listening on port ${port}`))

