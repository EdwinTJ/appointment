// src/components/Calendar.tsx
import { useState, useEffect, type HTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TimeDisplay } from "./TimeDisplay";
import type { CartItem } from "@/context/CartContext";
import { availabilityService } from "@/services/availabilityService";
import { useNavigate } from "react-router-dom";

type CalendarProps = HTMLAttributes<HTMLDivElement> & {
  initialDate?: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string | null) => void;
  selectedServices: CartItem[];
  stylistId?: number;
  onDateSelect: (date: Date | null) => void;
  onTimeConfirmed: () => void;
};

interface AvailabilityData {
  [key: string]: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export function Calendar({
  initialDate = new Date(),
  className,
  selectedTime,
  onTimeSelect,
  selectedServices,
  stylistId = 1,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setIsLoading(true);
        const data = await availabilityService.getAvailabilityByStylistId(
          stylistId
        );

        // Transform the data into the format we need
        const transformedData: AvailabilityData = {};

        data.forEach((item: any) => {
          const date = new Date(item.date);
          const dateString = date.toISOString().split("T")[0];

          // Categorize time slots into morning, afternoon, and evening
          const timeSlots = item.timeSlots.reduce(
            (acc: any, time: string) => {
              const hour = parseInt(time.split(":")[0]);
              if (hour < 12) {
                acc.morning.push(time);
              } else if (hour < 17) {
                acc.afternoon.push(time);
              } else {
                acc.evening.push(time);
              }
              return acc;
            },
            { morning: [], afternoon: [], evening: [] }
          );

          transformedData[dateString] = timeSlots;
        });

        setAvailabilityData(transformedData);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [stylistId]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hasAvailability = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    const dayAvailability = availabilityData[dateString];
    if (!dayAvailability) return false;

    return (
      dayAvailability.morning.length > 0 ||
      dayAvailability.afternoon.length > 0 ||
      dayAvailability.evening.length > 0
    );
  };

  const handleTimeConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    const totalAmount = selectedServices.reduce(
      (sum, item) => sum + item.service.price,
      0
    );

    navigate("/checkout", {
      state: {
        selectedDate,
        selectedTime,
        selectedServices,
        stylistId,
        totalAmount,
      },
    });
  };
  if (isLoading) {
    return <div className="text-center p-4">Loading availability...</div>;
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
      {/* Calendar header */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10 sm:h-14" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const currentDateObj = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          const isSelected =
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentDate.getMonth() &&
            selectedDate?.getFullYear() === currentDate.getFullYear();

          const hasTimeSlots = hasAvailability(currentDateObj);

          return (
            <Button
              key={day}
              variant="ghost"
              className={cn(
                "h-10 sm:h-14 p-0 font-normal relative",
                isToday &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isSelected && "border-2 border-primary",
                hasTimeSlots &&
                  "after:absolute after:bottom-1 after:right-1 after:w-1 after:h-1 after:bg-primary after:rounded-full"
              )}
              onClick={() => {
                setSelectedDate(currentDateObj);
                onTimeSelect(null);
              }}
            >
              {day}
            </Button>
          );
        })}
      </div>

      <div className="mt-4">
        {selectedDate && (
          <TimeDisplay
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={onTimeSelect}
            selectedServices={selectedServices}
            availability={
              availabilityData[selectedDate.toISOString().split("T")[0]]
            }
            onConfirm={handleTimeConfirm}
          />
        )}
      </div>
    </div>
  );
}
