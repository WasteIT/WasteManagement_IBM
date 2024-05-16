import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavMenu from './components/Includes/NavMenu'; 
import { FooterMenu } from './components/Includes/FooterMenu';
import UserContext from './utils/UserContext';
import Breadcrumbs from './utils/Breadcrumbs';
import { BreadcrumbProvider } from './utils/BreadcrumbContext';
import './style.css'
/**
 * Root component of the application responsible for rendering navigation menus,
 * routing, and providing context for user data.
 * 
 * @returns {JSX.Element} Root component of the application.
 */

export default function App() {
  const [streetName, setStreetName] = useState("");
  const [name, setName] = useState();
  const [pickup, setPickup] = useState();
  const [bins, setBins] = useState();
  const [avgerageWithOneDecimal, setAvgerageWithOneDecimal] = useState();

  const contextValue = {
    streetName,
    setStreetName,
    name,
    setName,
    pickup,
    setPickup,
    bins,
    setBins,
    avgerageWithOneDecimal,
    setAvgerageWithOneDecimal,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <BreadcrumbProvider>
       
          <NavMenu />
          <Breadcrumbs />
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
          <div style={{ marginTop: '16rem' }} />
          <FooterMenu />
        
      </BreadcrumbProvider>
    </UserContext.Provider>
  );
}
