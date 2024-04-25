import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Style.css';

export function NavMenu() {

    return (
      <header className='navbar-container'>
        <Navbar className="navbar-expand navbar-toggleable ng-white border-bottom box-shadow" container light>
        <NavbarBrand tag={Link} to="/">
          <h2 className='navigation-title'>Waste-IT</h2>
        </NavbarBrand>
        <NavbarToggler className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row" navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="home-style" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="" to="/Agreements">Agreements</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="" to="/Report">Report</NavLink>
              </NavItem>
              {true ? (
                <div className='logged_out_wrapper'>
                  <NavItem>
                    <NavLink tag={Link} className="" to="/Login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="" to="/Signup">Signup</NavLink>
                  </NavItem>
                </div>
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