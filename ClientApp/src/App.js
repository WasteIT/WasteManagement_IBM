import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { NavMenu } from './components/Includes/NavMenu'; 
import { FooterMenu } from './components/Includes/FooterMenu';

export default class App extends React.Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <NavMenu/>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
        <FooterMenu/>
      </div>
    );
  }
}
