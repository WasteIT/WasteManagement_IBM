import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';

function NavMenu() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <header>
      <Navbar className="navbar-container navbar-expand navbar-toggleable ng-white border-bottom box-shadow" container light>
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
              <NavLink tag={Link} className="navigation-link" to="/">Agreements</NavLink>
            </NavItem>
            {!isRootPath && (
              <NavItem>
                <NavLink tag={Link} className="navigation-link" to="/Report">Optimization</NavLink>
              </NavItem>
            )}
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

export default NavMenu;
