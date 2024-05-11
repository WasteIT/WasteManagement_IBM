import Agreements from "./pages/Agreements"
import CardPage from "./pages/CardPage";
import Layout from "./components/Graph/WasteBinsOverview"
import Login from "./Login";
import Signup from "./Signup";
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
    breadcrumb: 'Overview'
  },
  {
    path: '/login',
    element: <Login />,
    breadcrumb: 'Login'
  },
  {
    path: '/signup',
    element: <Signup />,
    breadcrumb: 'Signup'
  },
  {
    path: '/Report',
    element: <Report />,
    breadcrumb: 'Report'
  }
];


export default AppRoutes;
