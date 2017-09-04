import React, { Component } from "react"
import { Container } from "reactstrap"

import Navigation from "../components/Navigation"

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Container className="main-container">
          <h3>404 page not found</h3>
          <p>We are sorry but the page you are looking for does not exist.</p>
        </Container>
      </div>
    )
  }
}
