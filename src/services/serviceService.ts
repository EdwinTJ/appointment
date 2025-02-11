import { Service } from "@/utils/services";

const API_BASE_URL = "http://localhost:3000/api";

export const serviceService = {
  async getAllServices(): Promise<Service[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  },

  async getServiceById(id: string): Promise<Service> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching service:", error);
      throw error;
    }
  },
};
