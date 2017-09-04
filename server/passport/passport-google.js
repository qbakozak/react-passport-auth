const sql = require("mssql")
const jwt = require("jsonwebtoken")

const config = require("../config/config.js")

const loginQuery = `SELECT [id], [first_name], [last_name], [email], [provider] FROM ${config.databaseTable} WHERE [provider] = 'google' AND [id] = @id`

const registerQuery = `INSERT INTO ${config.databaseTable} ([id], [first_name], [last_name], [email], [provider]) VALUES (@id, @first_name, @last_name, @email, @provider)`

module.exports = function(
  dbConnection,
  accessToken,
  refreshToken,
  profile,
  done
) {
  console.log(`**Passport Google strategy...`)
  const request = new sql.Request(dbConnection)

  request.input("id", profile.id)
  request.query(loginQuery, (err, result) => {
    if (err) {
      return done(err)
    }

    if (result.recordset.length > 0) {
      // User already registered in DB
      console.log(`**Existing Google user...`)

      const user = result.recordset[0]
      delete user.password
      return done(null, user)
    } else {
      // New user
      console.log(`**New Google user...`)

      request.input("id", profile.id)
      request.input("first_name", profile.name.givenName)
      request.input("last_name", profile.name.familyName)
      request.input("email", profile.email)
      request.input("password", null)
      request.input("provider", "google")

      request.query(registerQuery, (err, result) => {
        if (err) {
          return done(err)
        }

        var user = {
          id: profile.id,
          email: profile.email,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          provider: "google"
        }

        user.created = true

        console.log(`**New Google user added...`)
        return done(null, user)
      })
    }
  })
}
