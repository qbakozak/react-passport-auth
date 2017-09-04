const express = require("express")
const router = new express.Router()
const fs = require("fs")
const moment = require("moment")

const config = require("../config/config")
const authCheckMiddleware = require("../middleware/auth-check")

// ------------------------------------------------------------------
// api routes
// ------------------------------------------------------------------

router.get("/profile", authCheckMiddleware(), (req, res) => {
  var user = req.session.passport
  res.json(user)
})

module.exports = router
