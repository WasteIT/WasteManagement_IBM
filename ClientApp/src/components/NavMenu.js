import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export function NavMenu() {


  //const [Collapsed, setCollapsed] = useState(true);
  //const [LoginStatus, setLoginStatus] = useState(false);
  
/*
  const handleLogout = () => {
    setLoginStatus(!LoginStatus)
  }

  const toggleNavbar = () => {
    setCollapsed(!Collapsed)
  }
*/

    return (
      <header>
        <Navbar className="navbar-expand navbar-toggleable ng-white border-bottom box-shadow" container light>
        <NavbarBrand tag={Link} to="/">
          <img src="https://placehold.co/50" alt="Logo"/>
        </NavbarBrand>
        <NavbarToggler className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row" navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="" to="/Agreements">Agreements</NavLink>
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