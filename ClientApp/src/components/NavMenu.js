import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase'; 

export class NavMenu extends Component {
  
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isLoggedIn: false,
      collapsed: true
    };
  }


  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      
      <header>
        <Navbar className="navbar-expand navbar-toggleable ng-white border-bottom box-shadow" container light>
        <NavbarBrand tag={Link} to="/">
          <img src="https://placehold.co/50" alt="Logo"/>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="" to="/Agreements">Agreements</NavLink>
              </NavItem>
              {this.state.isLoggedIn ? (
                <NavItem>
                <NavLink tag={Link} className="" to="/Login">Login</NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink tag={Link} className="" to="/Logout">Logout</NavLink>
                </NavItem>
              )}
            </ul>
         </Collapse>
        </Navbar>
      </header>
    );
  }
}