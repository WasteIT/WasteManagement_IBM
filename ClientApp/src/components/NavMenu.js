import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
            </ul>
         </Collapse>
        </Navbar>
      </header>
    );
  }
}