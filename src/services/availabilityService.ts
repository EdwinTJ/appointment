import { format } from "date-fns";
const API_BASE_URL = "http://localhost:3000/api";

export interface AvailabilityRequest {
  date: Date;
  timeSlots: string[];
  stylist?: string;
}

export interface Availability {
  id?: string;
  date: Date;
  timeSlots: string[];
  stylist?: string;
}

export const availabilityService = {
  // Get all availabilities
  async getAvailabilityByStylistId(stylistId: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/availability/${stylistId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch availabilities");
      }

      const data = await response.json();

      // Transform data to ensure consistent format
      const transformedData = data.map((item: any) => ({
        id: item.id,
        date: item.date,
        timeSlots: item.time_slots,
        stylistId: item.stylist_id,
      }));

      return transformedData;
    } catch (error) {
      alert(`Error in getAvailabilityByStylistId: ${error}`);
      throw error;
    }
  },

  // Get availability by id
  async getById(id: string) {
    const response = await fetch(`${API_BASE_URL}/availability/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch availability");
    }
    return response.json();
  },

  // Create new availability
  async create(data: AvailabilityRequest) {
    // Format the date to ISO string and ensure it's properly handled
    const formattedData = {
      ...data,
      date: format(data.date, "yyyy-MM-dd"), // Format date to YYYY-MM-DD
      stylist: data.stylist || "1", // Default to stylist ID 1 if not provided
    };

    const response = await fetch(`http://localhost:3000/api/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create availability");
    }
    console.log("Created : ", response);
    return response.json();
  },

  // Update availability
  async update(id: string, data: AvailabilityRequest) {
    const response = await fetch(`${API_BASE_URL}/availability/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update availability");
    }
    return response.json();
  },

  // Delete availability
  async delete(id: string) {
    const response = await fetch(`${API_BASE_URL}/availability/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete availability");
    }
    return response.json();
  },
};
