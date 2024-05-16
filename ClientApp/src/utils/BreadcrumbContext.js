import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Context provider for managing breadcrumbs in the application.
 * 
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components wrapped by the provider.
 * @returns {JSX.Element} BreadcrumbProvider component.
 * @example
 * // Example of usage:
 * // In App.js:
 * // import { BreadcrumbProvider } from './BreadcrumbProvider';
 * // <BreadcrumbProvider>
 * //   <App />
 * // </BreadcrumbProvider>
 * 
 * // In any component:
 * // import { useBreadcrumb } from './BreadcrumbProvider';
 * // const { breadcrumbs, addBreadcrumb } = useBreadcrumb();
 * // addBreadcrumb({ path: '/example', breadcrumb: 'Example' });
 */

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
