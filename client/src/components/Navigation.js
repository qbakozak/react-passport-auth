import React, { Component } from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap"
import axios from "axios"

import config from "../config/config"

import MdHome from "react-icons/lib/md/blur-on"
import MdPage from "react-icons/lib/md/bookmark-outline"

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: null,
      lastName: null,
      loginName: null,
      isOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentWillMount() {
    console.log(`**(Nav) Checking local storage...`)
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"))
      console.log(`**(Nav) User found in local storage...`)
      this.setState({
        firstName: user.first_name,
        lastName: user.last_name,
        loginName: user.email
      })
    } else {
      console.log(
        `**(Nav) User not found in local storage. Checking if user is logged in...`
      )
      axios
        .get(config.apiUrl + "/api/profile")
        .then(response => {
          console.log(`**(Nav) User is logged...`)
          const { first_name, last_name, email } = response.data.user
          localStorage.setItem("user", JSON.stringify(response.data.user))
          this.setState({
            firstName: first_name,
            lastName: last_name,
            loginName: email
          })
          window.location.href = "/"
        })
        .catch(err => {
          console.log(
            `**(Nav) User is not logged. Redirecting to login page...`
          )
          console.log(err)
          window.location.href = "/#/login"
        })
    }
  }

  render() {
    if (this.state.firstName) {
      return this.renderFull()
    } else {
      return this.renderLogin()
    }
  }

  renderFull() {
    return (
      <Navbar color="faded" className="navbar-expand-lg navbar-light bg-light">
        <Container>
          <NavbarToggler onClick={this.toggle} />
          <NavbarBrand href="/#/">
            <MdHome className="icon-position-fix" /> Home Page
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavLink href="/#/page1">
                <MdPage className="icon-position-fix" /> Page 1
              </NavLink>
              <NavLink href="/#/page2">
                <MdPage className="icon-position-fix" /> Page 2
              </NavLink>
              <NavLink href="/#/page3">
                <MdPage className="icon-position-fix" /> Bad Link
              </NavLink>
            </Nav>
          </Collapse>
          <div className="navbar-text">
            <Nav navbar>
              <NavItem>
                <NavLink href="/#/profile">
                  {this.state.firstName} {this.state.lastName}
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Container>
      </Navbar>
    )
  }

  renderLogin() {
    return (
      <Navbar color="faded" className="navbar-expand-lg navbar-light bg-light">
        <Container>
          <NavbarToggler onClick={this.toggle} />
          <NavbarBrand href="/#/">
            <MdHome className="icon-position-fix" /> Home Page
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar />
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}
