import { useState, type HTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { availability } from "@/utils/data";
import { TimeDisplay } from "./TImeDisplay";

type CalendarProps = HTMLAttributes<HTMLDivElement> & {
  initialDate?: Date;
};

export function Calendar({
  initialDate = new Date(),
  className,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    return dateString in availability;
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
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
              onClick={() => setSelectedDate(currentDateObj)}
            >
              {day}
            </Button>
          );
        })}
      </div>

      <div className="mt-4">
        {selectedDate && <TimeDisplay selectedDate={selectedDate} />}
      </div>
    </div>
  );
}
