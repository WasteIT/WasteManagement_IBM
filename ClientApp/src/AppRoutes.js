import Home from "./pages/Home";
import Agreements from "./pages/Agreements"
import CardPage from "./pages/CardPage";
import Layout from "./components/Graph/WasteBinsOverview"
import Login from "./Login";
import Signup from "./Signup";
import Report from "./pages/Report";
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/graph',
    element: <Layout />
  },
  {
    path: '/Agreements',
    element: <Agreements />
  }, 
  {
    path: '/Overview',
    element: <CardPage />
  }, 
  {
  path: '/login',
  element: <Login />
  },
  {
  path: '/signup',
  element: <Signup />
  },
  {
    path: '/Report',
    element: <Report/>
  }

];

export default AppRoutes;
