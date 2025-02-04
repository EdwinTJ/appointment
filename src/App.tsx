// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { CartProvider } from "./context/CartContext";
import { ServicesPage } from "./pages/ServicesPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AddUser from "./pages/user/AddUserPage";
import AddStylist from "./pages/stylist/AddStylistPage";
function App() {
  const [isAdmin] = useState(true);

  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ServicesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Protected Routes */}
          <Route
            path="/user/add"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stylist/add"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <AddStylist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
