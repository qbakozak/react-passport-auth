const sql = require("mssql")
const jwt = require("jsonwebtoken")

const config = require("../config/config.js")

const loginQuery = `SELECT [id], [first_name], [last_name], [email], [provider] FROM ${config.databaseTable} WHERE [provider] = 'facebook' AND [id] = @id`

const registerQuery = `INSERT INTO ${config.databaseTable} ([id], [first_name], [last_name], [email], [provider]) VALUES (@id, @first_name, @last_name, @email, @provider)`

module.exports = function(
  dbConnection,
  accessToken,
  refreshToken,
  profile,
  done
) {
  console.log(`**Passport Facebook strategy...`)
  const request = new sql.Request(dbConnection)

  request.input("id", profile.id)
  request.query(loginQuery, (err, result) => {
    if (err) {
      return done(err)
    }

    if (result.recordset.length > 0) {
      // User already registered in DB
      console.log(`**Existing Facebook user...`)

      const user = result.recordset[0]
      delete user.password
      return done(null, user)
    } else {
      // New user
      console.log(`**New Facebook user...`)

      request.input("id", profile.id)
      request.input("first_name", profile.name.givenName)
      request.input("last_name", profile.name.familyName)
      request.input("email", profile.email)
      request.input("password", null)
      request.input("provider", "facebook")

      request.query(registerQuery, (err, result) => {
        if (err) {
          return done(err)
        }

        var user = {
          id: profile.id,
          email: profile.email,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          provider: "facebook"
        }

        user.created = true

        console.log(`**New Facebook user added...`)
        return done(null, user)
      })
    }
  })
}
