const AWS = require('aws-sdk')

AWS.config.update({
  region: process.env.AWS_region,
  accessKeyId: process.env.AWS_accessKeyId,
  secretAccessKey: process.env.AWS_secretAccessKey,
})

const docClient = new AWS.DynamoDB.DocumentClient()

/**
 * Get user from DynamoDB
 * @function
 * @param {string} username - name of user
 */
const getUser = username => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName : 'UsersTable',
      Key: { username: username }
    }
    docClient.get(params, (err, data) => {
      if (err) reject(err)
      const user = data.Item || {}
      resolve(user)
    })
  })
}

/**
 * Create user in AWS DynamoDB in UsersTable
 * @function
 * @param {Object} data.username - name of user
 * @param {Object} data.salt - string to salt password
 * @param {Object} data.passwordHash - resulting password string
 */
const createUser = data => {
  return new Promise((resolve, reject) => {

    const create = user => {

      if ( user.username ) {
        reject('user already exists')
      } else {
        const params = {
          TableName : 'UsersTable',
          Item: { ...data }
        }
        docClient.put(params, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
      }

    }

    getUser(data.username).then(create)

  })
}

/**
 * Update user from AWS DynamoDB
 * @function
 * @param {string} username - name of user
 * @param {Object} opts.salt - user's salt
 * @param {Object} opts.passwordHash - user's passwordHash
 */
const updateUser = (username, opts) => {
  return new Promise((resolve, reject) => {

    const update = user => {

      if ( !user ) {
        reject('user not found')
      } else {

        const params = {
          TableName : 'UsersTable',
          Key: { username: username },
          ExpressionAttributeValues:{
            ':s': opts.salt,
            ':p': opts.passwordHash
          },
          ReturnValues: 'UPDATED_NEW'
        }

        if ( opts.salt && opts.passwordHash ) {
          params.UpdateExpression = 'set salt = :s, passwordHash=:p'
        } else if ( opts.salt ) {
          params.UpdateExpression = 'set salt = :s'
        } else if ( opts.passwordHash ) {
          params.UpdateExpression = 'set passwordHash=:p'
        }

        docClient.update(params, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })

      }

    }

    getUser(username).then(update)

  })
}

module.exports = { getUser, createUser, updateUser }

