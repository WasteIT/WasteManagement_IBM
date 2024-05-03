import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavMenu from './components/Includes/NavMenu'; 
import { FooterMenu } from './components/Includes/FooterMenu';
import UserContext from './utils/UserContext';
import './style.css'

export default function App() {
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <div>
        <NavMenu />
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
    </UserContext.Provider>
  );
}
