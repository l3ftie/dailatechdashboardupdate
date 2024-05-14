import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Booking, Clients, Home, Login, Payments, Profile, ProtectedRoute, Providers, SharedLayout } from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="clients" element={<Clients />} />
          <Route path="providers" element={<Providers />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* other outer routes */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
