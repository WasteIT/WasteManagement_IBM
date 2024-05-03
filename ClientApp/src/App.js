import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavMenu from './components/Includes/NavMenu'; 
import { FooterMenu } from './components/Includes/FooterMenu';
import './style.css'

export default class App extends React.Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <NavMenu/>
        <div style={{marginBottom: '8rem'}}></div> 
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
        <div style={{marginTop: '16rem'}}></div> 
        <FooterMenu/>
      </div>
    );
  }
}
