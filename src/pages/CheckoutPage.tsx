// src/pages/CheckoutPage.tsx
import { CheckoutForm } from "@/components/CheckoutForm";
import { useLocation, Navigate } from "react-router-dom";

export function CheckoutPage() {
  const location = useLocation();
  const state = location.state;

  // Redirect if no state is present
  if (
    !state?.selectedDate ||
    !state?.selectedTime ||
    !state?.selectedServices
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
      <CheckoutForm
        selectedDate={new Date(state.selectedDate)}
        selectedTime={state.selectedTime}
        selectedServices={state.selectedServices}
        stylistId={state.stylistId}
        totalAmount={state.totalAmount}
      />
    </div>
  );
}
