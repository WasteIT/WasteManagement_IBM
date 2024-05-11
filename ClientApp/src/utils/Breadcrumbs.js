import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBreadcrumb } from './BreadcrumbContext';
import AppRoutes from '../AppRoutes';
import UserContext from './UserContext';

const Breadcrumbs = () => {
  const location = useLocation();
  const { breadcrumbs, addBreadcrumb } = useBreadcrumb();
  const { name, streetName, pickup, bins, avgerageWithOneDecimal } = useContext(UserContext);

  useEffect(() => {
    const currentRoute = AppRoutes.find(route => route.path === location.pathname);
    const breadcrumbName = currentRoute ? currentRoute.breadcrumb : 'Home';


    if (breadcrumbs.length === 0 || breadcrumbs[breadcrumbs.length - 1].path !== location.pathname) {
      const breadcrumb = {
        path: location.pathname,
        breadcrumb: breadcrumbName
      };
      addBreadcrumb(breadcrumb);
    }
  }, [location, breadcrumbs, addBreadcrumb]);

  return (
    <nav className="breadcrumbs">
      <ol>
        {breadcrumbs.map(({ path, breadcrumb }, index) => {
            const linkState = path === '/graph' ? { name, streetName, pickup, bins, avgerageWithOneDecimal } : { name: streetName };
            
            return (
                <span>
                {index === 0 ? (
                    <Link to="/">{breadcrumb}</Link>
                ) : (
                    <Link to={path} state={linkState}>{breadcrumb}</Link>
                )}
                {index < breadcrumbs.length - 1 && " / "}
                </span>
            );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
