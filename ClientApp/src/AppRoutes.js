import Home from "./pages/Home";
import Agreements from "./pages/Agreements"
import Layout from "./components/Layout"

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
  }
];

export default AppRoutes;
