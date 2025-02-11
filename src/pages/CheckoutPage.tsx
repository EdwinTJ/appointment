// src/pages/CheckoutPage.tsx
import { CheckoutForm } from "@/components/CheckoutForm";
import { useLocation } from "react-router-dom";

export function CheckoutPage() {
  // Get these values from your route state/params
  const {
    selectedDate,
    selectedTime,
    selectedServices,
    stylistId,
    totalAmount,
  } = useLocation().state;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
      <CheckoutForm
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedServices={selectedServices}
        stylistId={stylistId}
        totalAmount={totalAmount}
      />
    </div>
  );
}
