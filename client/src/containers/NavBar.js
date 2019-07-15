import React, { Component } from "react";

import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Navbar.css";
import Routes from "../Routes";

class NavBar extends Component {
  render() {
    return (
      <div className="App ">
        
          <Navbar fluid collapseOnSelect >
            
          <Navbar.Header>

            <Navbar.Brand>
              <a href="/Home">
          <img  alt=""src="http://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png" style={{ width: 200 }} />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/Home">
                <NavItem>Home</NavItem>
              </LinkContainer>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
              
              <NavItem href="https://codeyourfuture.io/about/">About Us</NavItem>
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <Routes />
      </div>
    );
  }
}

export default NavBar;
