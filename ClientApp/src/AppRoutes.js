import Home from "./pages/Home";
import Agreements from "./pages/Agreements"
import Layout from "./components/Layout"
import LoginPage from "./LoginPage";
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
    index : true,
    element: <LoginPage />
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
