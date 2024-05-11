import React, { createContext, useContext, useState, useCallback } from 'react';

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([
    { path: '/', breadcrumb: 'Home' } 
  ]);

  const addBreadcrumb = useCallback((breadcrumb) => {
    setBreadcrumbs(current => {
      const existingIndex = current.findIndex(b => b.path === breadcrumb.path);
      if (existingIndex !== -1) {
        return current.slice(0, existingIndex + 1);
      }
      return [...current, breadcrumb];
    });
  }, []);

  const value = { breadcrumbs, addBreadcrumb };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
