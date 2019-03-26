const crypto = require('crypto')

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const passwordHash = hash.digest('hex')
  return { salt, passwordHash }
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = length => crypto
  .randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0,length)

/**
 * create salt from random string of characters
 * @function
 * @param {string} password - user generated password
 */
const saltHashPassword = password => {
  const salt = genRandomString(16)
  return sha512(password, salt)
}

/**
 * creates passwordHash from password and salt and compares to given passwordHash
 * @function
 * @param {number} length - Length of the random string.
 */
const hasValidPassword = ({ password, passwordHash, salt }) => {
  const isValid = ( password && passwordHash && salt )
  if ( !isValid ) return false
  const data = sha512(password, salt)
  return ( data.passwordHash === passwordHash )
}

module.exports = { sha512, saltHashPassword, hasValidPassword }
