import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { availabilityService } from "@/services/availabilityService";

type TimePeriod = "morning" | "afternoon" | "evening" | "night";

interface TimeSlot {
  time: string;
  period: TimePeriod;
}

const TIME_PERIODS: Record<TimePeriod, string> = {
  morning: "Morning (6:00 AM - 11:30 AM)",
  afternoon: "Afternoon (12:00 PM - 4:30 PM)",
  evening: "Evening (5:00 PM - 8:30 PM)",
  night: "Night (9:00 PM - 11:30 PM)",
};

// Generate time slots for a specific period
const generateTimeSlots = (period: TimePeriod): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let startHour: number;
  let endHour: number;

  switch (period) {
    case "morning":
      startHour = 6;
      endHour = 11;
      break;
    case "afternoon":
      startHour = 12;
      endHour = 16;
      break;
    case "evening":
      startHour = 17;
      endHour = 20;
      break;
    case "night":
      startHour = 21;
      endHour = 23;
      break;
  }

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes of ["00", "30"]) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const timeString = `${hour12}:${minutes} ${ampm}`;
      slots.push({ time: timeString, period });
    }
  }

  return slots;
};

// Helper function to determine which periods contain the selected time slots
const determineSelectedPeriods = (timeSlots: string[]): TimePeriod[] => {
  const periods = new Set<TimePeriod>();

  timeSlots.forEach((timeSlot) => {
    const hour = parseInt(timeSlot.split(":")[0]);
    const meridian = timeSlot.includes("PM") ? "PM" : "AM";
    const hour24 = meridian === "PM" && hour !== 12 ? hour + 12 : hour;

    if (hour24 >= 6 && hour24 < 12) periods.add("morning");
    else if (hour24 >= 12 && hour24 < 17) periods.add("afternoon");
    else if (hour24 >= 17 && hour24 < 21) periods.add("evening");
    else if (hour24 >= 21) periods.add("night");
  });

  return Array.from(periods);
};

export function EditAvailabilityPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPeriods, setSelectedPeriods] = useState<TimePeriod[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!id) return;

      try {
        const availability = await availabilityService.getById(id);
        console.log("Fetched availability:", availability); // Add this for debugging

        // Add null checks and data validation
        if (availability && availability.date) {
          setSelectedDate(new Date(availability.date));
        }

        // Ensure timeSlots is an array before using it
        const timeSlots = Array.isArray(availability.time_slots)
          ? availability.time_slots
          : Array.isArray(availability.timeSlots)
          ? availability.timeSlots
          : [];

        setSelectedTimeSlots(new Set(timeSlots));
        setSelectedPeriods(determineSelectedPeriods(timeSlots));
      } catch (err) {
        console.error("Error fetching availability:", err); // Add this for debugging
        setError(
          err instanceof Error ? err.message : "Failed to fetch availability"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [id]);

  const allTimeSlots = selectedPeriods.flatMap(generateTimeSlots);

  const handlePeriodToggle = (period: TimePeriod) => {
    setSelectedPeriods((current) =>
      current.includes(period)
        ? current.filter((p) => p !== period)
        : [...current, period]
    );
  };

  const handleTimeSlotToggle = (timeSlot: string) => {
    setSelectedTimeSlots((current) => {
      const newSet = new Set(current);
      if (newSet.has(timeSlot)) {
        newSet.delete(timeSlot);
      } else {
        newSet.add(timeSlot);
      }
      return newSet;
    });
  };

  const handleUpdate = async () => {
    if (!selectedDate || !id) return;

    setIsLoading(true);
    try {
      const updatedAvailability = {
        date: selectedDate,
        timeSlots: Array.from(selectedTimeSlots),
      };

      await availabilityService.update(id, updatedAvailability);
      setSuccessMessage("Availability updated successfully");

      // Navigate back after short delay
      setTimeout(() => {
        navigate("/admin/availability/list");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update availability"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading availability...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center">
              Edit Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="flex justify-center text-lg font-medium mb-4">
                Select Date
              </h3>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
            </div>

            {selectedDate && (
              <>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Select Time Periods
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(TIME_PERIODS).map(([period, label]) => (
                      <div key={period} className="flex items-center space-x-2">
                        <Checkbox
                          id={period}
                          checked={selectedPeriods.includes(
                            period as TimePeriod
                          )}
                          onCheckedChange={() =>
                            handlePeriodToggle(period as TimePeriod)
                          }
                        />
                        <label
                          htmlFor={period}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPeriods.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Select Time Slots
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {allTimeSlots.map((slot) => (
                        <div
                          key={slot.time}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={slot.time}
                            checked={selectedTimeSlots.has(slot.time)}
                            onCheckedChange={() =>
                              handleTimeSlotToggle(slot.time)
                            }
                          />
                          <label
                            htmlFor={slot.time}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {slot.time}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => navigate("/admin/availability/list")}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={
                !selectedDate || selectedTimeSlots.size === 0 || isLoading
              }
              onClick={handleUpdate}
            >
              {isLoading ? "Updating..." : "Update Availability"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
