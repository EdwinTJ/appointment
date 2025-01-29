// src/components/TimeDisplay.tsx
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { availability } from "@/utils/data";

interface TimeDisplayProps extends HTMLAttributes<HTMLDivElement> {
  selectedDate: Date | null;
}

export function TimeDisplay({
  selectedDate,
  className,
  ...props
}: TimeDisplayProps) {
  if (!selectedDate) return null;

  const dateString = selectedDate.toISOString().split("T")[0];
  const dayAvailability = availability[dateString];

  if (!dayAvailability) {
    return (
      <Card className={cn("w-full max-w-md", className)} {...props}>
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
          <p className="text-muted-foreground">No availability for this date</p>
        </CardContent>
      </Card>
    );
  }

  const periods: ("morning" | "afternoon" | "evening")[] = [
    "morning",
    "afternoon",
    "evening",
  ];

  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
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
              {dayAvailability[period]?.length ? (
                <div className="grid grid-cols-3 gap-2">
                  {dayAvailability[period]?.map((time) => (
                    <div
                      key={time}
                      className="bg-secondary text-secondary-foreground rounded-md px-3 py-1 text-sm text-center"
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
    </Card>
  );
}
