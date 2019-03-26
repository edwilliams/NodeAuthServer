// https://express-validator.github.io/docs/
const { check } = require('express-validator/check')

const userValidation = [
  check('username').isEmail(),
  check('password').isLength({ min: 5 })
]

module.exports = { userValidation }
