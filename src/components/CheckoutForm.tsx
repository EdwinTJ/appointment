import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookingService } from "../services/bookingService";
import type { CartItem } from "@/context/CartContext";

interface CheckoutFormProps {
  selectedDate: Date;
  selectedTime: string;
  selectedServices: CartItem[];
  stylistId: number;
  totalAmount: number;
}

export function CheckoutForm({
  selectedDate,
  selectedTime,
  selectedServices,
  stylistId,
  totalAmount,
}: CheckoutFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      // Create or get customer
      const customer = await bookingService.createOrGetCustomer({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
      });

      // Create appointment
      const appointment = await bookingService.createAppointment({
        customerId: customer.id!,
        stylistId,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        status: "pending",
        totalAmount,
        services: selectedServices.map((item) => ({
          serviceId: parseInt(item.serviceId),
          price: item.service.price,
        })),
      });

      // Navigate to confirmation page
      navigate(`/booking-confirmation/${appointment.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md"
      >
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}
