// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiceCards from "./components/ServiceCards";
import { Calendar } from "./components/Calendar";
import { CartSummary } from "./components/CartSummary";
import { CartProvider } from "./context/CartContext";

function ServicesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-6">
        <CartSummary />
      </div>
      <ServiceCards />
    </div>
  );
}

function CalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <Calendar />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
