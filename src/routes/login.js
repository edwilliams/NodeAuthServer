const jwt = require('jsonwebtoken')
// https://express-validator.github.io/docs/
const { validationResult } = require('express-validator/check')

const { saltHashPassword, hasValidPassword } = require('../utils/encrypt')
const { getUser, createUser } = require('../utils/userDB')

const POST = async (req, res) => {

  const { username, password } = req.body

  if ( username && password ) {

    const _user = await getUser(username)
    const isValid = hasValidPassword({ password, passwordHash: _user.passwordHash, salt: _user.salt  })

    if ( isValid ) {

      const token = jwt.sign({ username }, process.env.JWT_secret, { expiresIn: '24h'  })

      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token // return the JWT token for the future API calls
      })

    } else {

      res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
      })
    }

  } else {

    res.status(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    })

  }

}

module.exports = { POST }
