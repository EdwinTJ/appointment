// src/components/TimeDisplay.tsx
import { useState, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/context/CartContext";

interface TimeDisplayProps extends HTMLAttributes<HTMLDivElement> {
  selectedDate: Date | null;
  selectedTime: string | null;
  onTimeSelect: (time: string | null) => void;
  selectedServices: CartItem[];
  availability?: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  onConfirm: () => void;
}

export function TimeDisplay({
  selectedDate,
  selectedTime,
  onTimeSelect,
  selectedServices,
  availability,
  onConfirm,
  className,
  ...props
}: TimeDisplayProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!selectedDate || !availability) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (isConfirming) {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)} {...props}>
        <CardHeader>
          <CardTitle>Confirm Your Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Appointment Time</h3>
              <p className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" at "}
                {selectedTime}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Selected Services</h3>
              <div className="space-y-2 mt-2">
                {selectedServices.map(({ serviceId, service }) => (
                  <div key={serviceId} className="flex justify-between text-sm">
                    <span className="capitalize">{serviceId}</span>
                    <span>{formatPrice(service.price)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      {formatPrice(
                        selectedServices.reduce(
                          (sum, { service }) => sum + service.price,
                          0
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsConfirming(false)}>
            Back
          </Button>
          <Button
            onClick={() => {
              onConfirm();
            }}
          >
            Confirm & Pay
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const periods: ("morning" | "afternoon" | "evening")[] = [
    "morning",
    "afternoon",
    "evening",
  ];

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)} {...props}>
      <CardHeader>
        <CardTitle>
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {periods.map((period) => (
            <div key={period} className="space-y-2">
              <h3 className="font-medium capitalize">{period}</h3>
              {availability[period]?.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availability[period].map((time) => (
                    <div
                      key={time}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm text-center cursor-pointer transition-colors",
                        selectedTime === time
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                      onClick={() => onTimeSelect(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No availability</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!selectedTime}
          onClick={() => setIsConfirming(true)}
        >
          Confirm Time
        </Button>
      </CardFooter>
    </Card>
  );
}
