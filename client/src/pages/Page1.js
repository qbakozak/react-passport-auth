import React, { Component } from "react"
import { Container } from "reactstrap"

import Navigation from "../components/Navigation.js"

export default class Page1 extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Container className="main-container">
          <h3>Page 1</h3>
          <h5>Subtitle</h5>
        </Container>
      </div>
    )
  }
}
