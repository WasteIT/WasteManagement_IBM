import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Style.css';

export function NavMenu() {

    return (
      <header >
        <Navbar className="navbar-container navbar-expand navbar-toggleable ng-white border-bottom box-shadow" container light>
          <div className="page-title-wrapper-outer">
            <NavbarBrand tag={Link} to="/">
             
              <div className='page-title-wrapper-inner'>
                <div class="trash-bin">
                  <div class="handle"></div>
                  <div class="lid"></div>
                  <span class="slot first-slot"></span>
                  <span class="slot last-slot"></span>
                </div>
                <span className='page-title'>aste-IT</span>
                </div>
            </NavbarBrand>
          </div>
          <NavbarToggler className="mr-2" />
          <Collapse className="navigation-link-wrapper-outer d-sm-inline-flex flex-sm-row" navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="navigation-link" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="navigation-link" to="/Agreements">Agreements</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="navigation-link" to="/Report">Report</NavLink>
              </NavItem>
              <div className='login-wrapper-outer'>
                {true ? (
                  <span className='logged-out-wrapper-inner'>
                    <NavItem>
                      <NavLink tag={Link} className="" to="/Login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="" to="/Signup">Signup</NavLink>
                    </NavItem>
                  </span>
                ) : (
                  <NavItem>
                    <NavLink tag={Link} className="" to="/Logout">Logout</NavLink>
                  </NavItem>
                )}
               </div>
            </ul>
         </Collapse>
        </Navbar>
      </header>
    );
}