import Agreements from "./pages/Agreements"
import CardPage from "./pages/CardPage";
import Layout from "./components/Graph/WasteBinsOverview"
import Report from "./pages/Report";
/**
 * Defines the routes for the application.
 * Each route object contains the path, the component to be rendered, and the breadcrumb text.
 * 
 * @type {Array<Object>} Array of route objects.
 */

const AppRoutes = [
  {
    path: '/',
    element: <Agreements />,
    breadcrumb: 'Home'
  },
  {
    path: '/graph',
    element: <Layout />,
    breadcrumb: 'Graph'
  },
  {
    path: '/Overview',
    element: <CardPage />,
    breadcrumb: 'Fraction'
  },
  {
    path: '/Report',
    element: <Report />,
    breadcrumb: 'Optimization'
  }
];


export default AppRoutes;
