// src/pages/CalendarPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/Calendar";
import { CartSummary } from "@/components/CartSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ChevronLeft } from "lucide-react";

export function CalendarPage() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const stylistId = 1;
  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Services
        </Button>
        <CartSummary />
      </div>
      <Calendar
        selectedTime={selectedTime}
        onTimeSelect={setSelectedTime}
        selectedServices={items}
        stylistId={stylistId}
      />
    </div>
  );
}
