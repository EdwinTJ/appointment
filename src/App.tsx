// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { CartProvider } from "./context/CartContext";
import { ServicesPage } from "./pages/services/ServicesPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AddUser } from "./pages/user/AddUserPage";
import { AddStylist } from "./pages/stylist/AddStylistPage";
import { AddService } from "./pages/services/AddServicePage";
import { AddAvailabilityPage } from "./pages/availability/AddAvailabilityPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminLayout from "./pages/admin/AdminLayout";
import { ServicesTable } from "./pages/services/ServiceListPage";
import { StylistListPage } from "./pages/stylist/StylistListPage";
import { AvailabilityListPage } from "./pages/availability/AvailabilityListPage";
import { CustomerListPage } from "./pages/customer/CustomerListPage";
import AppointmentsPage from "./pages/appointment/AppointmentsPage";
import { BookingConfirmationPage } from "./pages/appointment/BookingConfirmationPage";
import { EditServicePage } from "./pages/services/EditServicePage";
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
          <Route
            path="/booking-confirmation/:appointmentId"
            element={<BookingConfirmationPage />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />

            {/* Stylist Routes */}
            <Route path="stylist/add" element={<AddStylist />} />
            <Route path="stylist/list" element={<StylistListPage />} />
            <Route path="stylist/edit" element={<div>Edit Stylist</div>} />
            <Route path="stylist/delete" element={<div>Delete Stylist</div>} />

            {/* Availability Routes */}
            <Route path="availability/add" element={<AddAvailabilityPage />} />
            <Route
              path="availability/list"
              element={<AvailabilityListPage />}
            />
            <Route
              path="availability/edit"
              element={<div>Edit Availability</div>}
            />
            <Route
              path="availability/delete"
              element={<div>Delete Availability</div>}
            />

            {/* Customer Routes */}
            <Route path="customers/add" element={<AddUser />} />
            <Route path="customers/list" element={<CustomerListPage />} />
            <Route path="customers/edit" element={<div>Edit Customer</div>} />
            <Route
              path="customers/delete"
              element={<div>Delete Customer</div>}
            />
            {/* Appointments Routes */}
            <Route
              path="appointments/list"
              element={<AppointmentsPage stylistId="1" />}
            />

            {/* Service Routes */}
            <Route path="services/list" element={<ServicesTable />} />
            <Route path="services/add" element={<AddService />} />
            <Route path="services/edit/:id" element={<EditServicePage />} />
            <Route path="services/delete" element={<div>Delete Service</div>} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
