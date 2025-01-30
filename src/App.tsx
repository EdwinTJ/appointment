// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { CartProvider } from "./context/CartContext";
import { ServicesPage } from "./pages/ServicesPage";
import { CheckoutPage } from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
