import React, { Component } from "react"
import { Container, Button } from "reactstrap"

import Navigation from "../components/Navigation"

import FaFacebook from "react-icons/lib/fa/facebook-official"
import FaGoogle from "react-icons/lib/fa/google"

export default class Login extends Component {
  loginToADFS(e) {
    e.preventDefault()
    window.location = "/auth/login-adfs"
  }

  loginToFacebook(e) {
    e.preventDefault()
    window.location = "/auth/login-facebook"
  }

  loginToGoogle(e) {
    e.preventDefault()
    window.location = "/auth/login-google"
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container className="login-box">
          <h3>
            <br />o o
            <br /> |
            <br />\____/
            <br />
            <br />
          </h3>
          <Button
            color="secondary"
            onClick={this.loginToADFS.bind(this)}
            className="cursor-pointer"
          >
            Login with ADFS
          </Button>{" "}
          <Button
            color="primary"
            onClick={this.loginToFacebook.bind(this)}
            className="cursor-pointer"
          >
            <FaFacebook className="icon-position-fix" /> Login with Facebook
          </Button>{" "}
          <Button
            color="success"
            onClick={this.loginToGoogle.bind(this)}
            className="cursor-pointer"
          >
            <FaGoogle className="icon-position-fix" /> Login with Google
          </Button>
        </Container>
      </div>
    )
  }
}
