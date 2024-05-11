import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavMenu from './components/Includes/NavMenu'; 
import { FooterMenu } from './components/Includes/FooterMenu';
import UserContext from './utils/UserContext';
import Breadcrumbs from './utils/Breadcrumbs';
import { BreadcrumbProvider } from './utils/BreadcrumbContext';
import './style.css'

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
        <div>
          <NavMenu />
          <Breadcrumbs />
          <div style={{ marginBottom: '8rem' }} />
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
          <div style={{ marginTop: '16rem' }} />
          <FooterMenu />
        </div>
      </BreadcrumbProvider>
    </UserContext.Provider>
  );
}
