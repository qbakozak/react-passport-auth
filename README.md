# react-passport-auth

React front end with Nodejs + Passport.js backend


## Features

- Write your single page application in ReactJS
- Add authentication provider of your choice: Facebook, Google or Microsoft's Corporate ADFS
- Record users in MS SQL database in Azure


## Installing

Using npm:

```bash
$ npm install react-passport-auth
```

## Configuring

All project configuration is stored in two config.js files - one for back end and one for front end.

```
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
```

## Usage

When all authentication sources and Azure SQL database is configured you should be able to start the server and test it.

### Development mode

In the development mode any changes to the project are automatically re-compiled and server is restarted.
To start project in development mode open two terminal windows in the root of the project.

In the first window run:

```bash
$ npm run bundle
```

That will start the webpack in the watch mode and generate the front end files.

In the second window run:
```bash
$ npm start
```

That will start up the nodeJS back end.


### Production mode

In the production mode front end files are re-compiled and minified for production use.
To start project in production mode open two terminal windows in the root of the project.

In the first window run:

```bash
$ npm run deploy
```

In the second window run:
```bash
$ npm start
```

That will start up the nodeJS back end.
