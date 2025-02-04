const API_BASE_URL = "http://localhost:3000/api";

export interface AvailabilityRequest {
  date: Date;
  timeSlots: string[];
}

export const availabilityService = {
  // Get all availabilities
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/availability`);
    if (!response.ok) {
      throw new Error("Failed to fetch availabilities");
    }
    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create availability");
    }
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
