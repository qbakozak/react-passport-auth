import config from "../config/config"
import axios from "axios"

function logoutUser() {
  console.log("Logging out user...")
  localStorage.removeItem("user")

  axios
    .get(config.apiUrl + "/auth/logout")
    .then(response => {
      window.location.href = "/#/login"
    })
    .catch(err => {
      window.location.href = "/#/login"
    })

  function logoutDone() {}
}

module.exports = logoutUser
