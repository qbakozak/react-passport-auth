const hostUrl = require("../../client/src/config/config").apiUrl

var config = {
  databaseConfig: {
    // MS SQL database config
    user: "",
    password: "",
    server: "",
    database: "",
    options: {
      encrypt: true // Use this if you're on Windows Azure
    },
    requestTimeout: 60000
  },
  databaseTable: "", // Database table name to register users e.g. [dbo].[users]
  azureApp: {
    // Azure Application details
    base: "https://login.microsoftonline.com/",
    clientID: "",
    clientSecret: "",
    callbackUri: hostUrl + "/auth/cbAdfs",
    resource: "https://graph.microsoft.com/",
    tenant: ""
  },
  facebookApp: {
    // Facebook Application details
    clientID: "",
    clientSecret: "",
    callbackUrl: hostUrl + "/auth/cbFacebook"
  },
  googleApp: {
    // Google Application details
    clientID: "",
    clientSecret: "",
    callbackUrl: hostUrl + "/auth/cbGoogle"
  },
  jwtSecret: "big Secret",
  serverPort: 8080
}

module.exports = config
