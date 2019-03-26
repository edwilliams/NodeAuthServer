// https://express-validator.github.io/docs/
const { validationResult } = require('express-validator/check')

const { saltHashPassword } = require('../utils/encrypt')
const { createUser } = require('../utils/userDB')

const POST = async (req, res) => {

  const { username, password } = req.body

  const errors = validationResult(req)

  if ( !errors.isEmpty() ) {
    return res.status(422).json({ errors: errors.array() })
  }

  try {

    const { salt, passwordHash } = saltHashPassword(password)
    await createUser({ username, salt, passwordHash })

    res.json({
      success: true,
      message: 'Registration successful!'
    })

  } catch(err) {

    const errors = {
      errors: [
        {
          location: 'body',
          param: 'username',
          value: username,
          msg: 'Username already taken'
        }
      ]
    }

    res.status(422).json(errors)

  }

}

module.exports = { POST }
