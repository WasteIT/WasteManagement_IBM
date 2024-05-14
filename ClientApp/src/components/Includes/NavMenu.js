import React, { useContext } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../../utils/UserContext';
import { Popup } from '../../utils/Popup/Popup';
import { useKeyboardPopup } from '../../utils/Popup/useKeyboardPopup';

function NavMenu() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  const { streetName } = useContext(UserContext);

  useKeyboardPopup();

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
              <span className='flex-row'>
                <NavItem>
                  <NavLink tag={Link} data-testid="Fraction-nav" className="navigation-link" to="/Overview" state={{ name: streetName }}>Fraction</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} data-testid="Optimization-nav" className="navigation-link" to="/Report" state={{ name: streetName }}>Optimization</NavLink>
                </NavItem>
                <Popup />
              </span>
            )}
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default NavMenu;
