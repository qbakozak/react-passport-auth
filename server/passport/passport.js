const sql = require("mssql")
const AzureOAuth2Strategy = require("passport-azure-ad-oauth2")
const FacebookStrategy = require("passport-facebook")
const GoogleStrategy = require("passport-google-oauth20").Strategy

const config = require("../config/config")
const dbConnection = new sql.ConnectionPool(config.databaseConfig)

const adfsStrategy = require("./passport-adfs")
const facebookStrategy = require("./passport-facebook")
const googleStrategy = require("./passport-google")

module.exports = function(passport) {
  dbConnection.connect(err => {
    if (err) console.log("Can't connect to DB")
    else console.log("Connected to DB")
  })

  passport.serializeUser((email, done) => {
    done(null, email)
  })

  passport.deserializeUser((email, done) => {
    const request = new sql.Request(dbConnection)
    const deserializeQuery = `SELECT * FROM ${config.databaseTable} WHERE id = @email`

    request.input("email", email)
    request.query(deserializeQuery, (err, result) => {
      done(err, result.recordset)
    })
  })

  // ADFS signup strategy
  passport.use(
    "adfs",
    new AzureOAuth2Strategy(
      {
        clientID: config.azureApp.clientID,
        clientSecret: config.azureApp.clientSecret,
        callbackURL: config.azureApp.callbackUri,
        resource: config.azureApp.resource,
        tenant: config.azureApp.tenant
      },
      (access_token, refresh_token, params, profile, done) =>
        adfsStrategy(
          dbConnection,
          access_token,
          refresh_token,
          params,
          profile,
          done
        )
    )
  )

  // Facebook signup strategy
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: config.facebookApp.clientID,
        clientSecret: config.facebookApp.clientSecret,
        callbackURL: config.facebookApp.callbackUrl,
        profileFields: ["id", "emails", "name"]
      },
      (accessToken, refreshToken, profile, done) =>
        facebookStrategy(dbConnection, accessToken, refreshToken, profile, done)
    )
  )

  // Facebook signup strategy
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: config.googleApp.clientID,
        clientSecret: config.googleApp.clientSecret,
        callbackURL: config.googleApp.callbackUrl,
        scope: ["profile"]
      },
      (accessToken, refreshToken, profile, done) =>
        googleStrategy(dbConnection, accessToken, refreshToken, profile, done)
    )
  )
}
