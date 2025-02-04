type TimePeriods = "morning" | "afternoon" | "evening" | "night";

interface Availability {
  [date: string]: {
    [period in TimePeriods]?: string[];
  };
}

export const availability: Availability = {
  "2025-02-16": {
    morning: ["08:00 AM", "09:30 AM", "10:00 AM"],
    afternoon: ["12:30 PM", "01:00 PM"],
    evening: ["05:00 PM", "05:30 PM"],
  },
  "2025-02-19": {
    morning: ["08:30 AM", "09:00 AM"],
    afternoon: ["01:30 PM", "02:00 PM"],
    evening: [],
  },
  "2025-02-23": {
    morning: ["08:00 AM", "09:30 AM", "10:00 AM"],
    afternoon: ["12:30 PM", "01:00 PM"],
    evening: ["05:00 PM", "05:30 PM"],
  },
};
