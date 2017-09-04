import React, { Component } from "react"
import { Container, Button } from "reactstrap"
import axios from "axios"

import Navigation from "../components/Navigation"
import config from "../config/config"
import logoutUser from "../functions/logoutUser"

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginName: null,
      firstName: null,
      lastName: null,
      id: null
    }
  }

  componentWillMount() {
    console.log(`**(Profile) Loading user details from the server...`)

    axios
      .get(config.apiUrl + "/api/profile")
      .then(response => {
        console.log(`**(Profile) User is logged...`)
        const {
          email,
          first_name,
          last_name,
          id,
          provider
        } = response.data.user
        this.setState({
          loginName: email,
          firstName: first_name,
          lastName: last_name,
          provider,
          id
        })
      })
      .catch(err => {
        console.log(
          `**(Profile) User is not logged. Redirecting to login page...`
        )
        console.log(err)
        localStorage.removeItem("user")
        window.location.href = "/#/login"
      })
  }

  render() {
    const { firstName, lastName, loginName, id, provider } = this.state
    return (
      <div>
        <Navigation />
        <Container className="main-container">
          <h3>User Profile</h3>
          <p>Authenticated with: {provider}</p>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>E-mail: {loginName}</p>
          <p>ID: {id}</p>
          <br />
          <Button color="warning" onClick={logoutUser}>
            Logout
          </Button>
        </Container>
      </div>
    )
  }
}
