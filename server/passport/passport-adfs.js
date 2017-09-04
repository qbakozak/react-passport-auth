const sql = require("mssql")
const jwt = require("jsonwebtoken")

const config = require("../config/config.js")

const loginQuery = `SELECT [id], [first_name], [last_name], [email], [provider] FROM ${config.databaseTable} WHERE [provider] = 'adfs' AND [id] = @id`

const registerQuery = `INSERT INTO ${config.databaseTable} ([id], [first_name], [last_name], [email], [provider]) VALUES (@id, @first_name, @last_name, @email, @provider)`

module.exports = function(
  dbConnection,
  access_token,
  refresh_token,
  params,
  profile,
  done
) {
  console.log(`**Passport ADFS strategy...`)
  const user_profile = jwt.decode(params.id_token, "", true)
  const request = new sql.Request(dbConnection)

  request.input("id", user_profile.oid)
  request.query(loginQuery, (err, result) => {
    if (err) {
      return done(err)
    }

    if (result.recordset.length > 0) {
      // User already registered in DB
      console.log(`**Existing ADFS user...`)

      const user = result.recordset[0]
      delete user.password
      return done(null, user)
    } else {
      // New user
      console.log(`**New ADFS user...`)

      request.input("id", user_profile.oid)
      request.input("first_name", user_profile.given_name)
      request.input("last_name", user_profile.family_name)
      request.input("email", user_profile.upn)
      request.input("password", null)
      request.input("provider", "adfs")

      request.query(registerQuery, (err, result) => {
        if (err) {
          return done(err)
        }

        var user = {
          id: user_profile.aud,
          email: user_profile.upn,
          first_name: user_profile.given_name,
          last_name: user_profile.family_name,
          provider: "adfs"
        }

        user.created = true

        console.log(`**ADFS user added...`)
        return done(null, user)
      })
    }
  })
}
