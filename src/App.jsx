import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import {
  Booking,
  Clients,
  Home,
  Login,
  PageNotFound,
  Payments,
  Profile,
  ProtectedRoute,
  Providers,
  SharedLayout,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bookings",
    element: <Booking />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/providers",
    element: <Providers />,
  },
  {
    path: "/payments",
    element: <Payments />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
