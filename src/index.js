require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { checkToken } = require('./middleware/auth')
const { userValidation } = require('./middleware/userValidation')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/v/1/auth/register', userValidation, routes.register.POST)
app.post('/v/1/auth/login', routes.login.POST)
app.get('/v/1/test', checkToken, routes.test.GET)

app.listen(port, () => console.log(`Server is listening on port: ${port}`))
