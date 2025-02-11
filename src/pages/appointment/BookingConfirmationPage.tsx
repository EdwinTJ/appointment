import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { bookingService } from "@/services/bookingService";
import { TransformedAppointment } from "@/utils/appointment";

export function BookingConfirmationPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<TransformedAppointment | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId) return;

      try {
        setIsLoading(true);
        const data = await bookingService.getAppointmentById(
          parseInt(appointmentId)
        );
        setAppointment(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load appointment"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>
              {error || "Booking information not found"}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <CheckCircle className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Booking Confirmed!</CardTitle>
              <CardDescription>
                Your appointment has been successfully scheduled
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Appointment Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Appointment Time</h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(appointment.date)} at {appointment.time}
              </p>
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="font-medium">Customer Details</h3>
              <div className="text-sm text-muted-foreground">
                <p>
                  {appointment.customer.firstName}{" "}
                  {appointment.customer.lastName}
                </p>
                <p>{appointment.customer.email}</p>
                <p>{appointment.customer.phone}</p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-medium">Services</h3>
              <div className="space-y-2 mt-2">
                {appointment.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span className="capitalize">{service.serviceName}</span>
                    <span>{formatPrice(service.price)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(appointment.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Reference */}
            <div>
              <h3 className="font-medium">Booking Reference</h3>
              <p className="text-sm text-muted-foreground">#{appointment.id}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/")}>
            Book Another Appointment
          </Button>
          {/* Add Calender Feature */}
          <Button
            onClick={() => {
              // You could implement calendar integration here
              console.log("Add to calendar clicked");
            }}
          >
            Add to Calendar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
