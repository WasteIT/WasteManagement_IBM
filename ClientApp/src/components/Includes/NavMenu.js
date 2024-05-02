import { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export function NavMenu() {


    return (
      <header >
        <Navbar className="navbar-container navbar-expand navbar-toggleable ng-white border-bottom fixed-top" container light>
          <div className="page-title-wrapper-outer">
            <NavbarBrand tag={Link} to="/">
             
              <div className='page-title-wrapper-inner'>
                
                <span className='page-title'>Waste-IT</span>
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
                <NavLink tag={Link} className="navigation-link" to="/Report">Report</NavLink>
              </NavItem>
              <div className='login-wrapper-outer'>
                {true ? (
                  <span className='flex-row'>
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