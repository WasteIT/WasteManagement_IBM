import Home from "./pages/Home";
import Agreements from "./pages/Agreements"
import CardPage from "./pages/CardPage";
import Layout from "./components/Layout"
import Login from "./Login";
import Signup from "./Signup";

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
  }

];

export default AppRoutes;
