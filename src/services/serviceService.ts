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

  async deleteService(id: string): Promise<Response> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  },

  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  },
};
