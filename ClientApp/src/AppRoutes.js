import Agreements from "./pages/Agreements"
import CardPage from "./pages/CardPage";
import Layout from "./components/Graph/WasteBinsOverview"
import Report from "./pages/Report";

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
