const API_BASE_URL = "http://localhost:3000/api";
import { Stylist } from "../utils/stylist";
export const stylistService = {
  async getAllStylists() {
    try {
      const response = await fetch(`${API_BASE_URL}/stylists`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching stylists:", error);
      throw error;
    }
  },

  async getStylistById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/stylists/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching stylist:", error);
      throw error;
    }
  },

  async updateStylist(id: string, stylist: Partial<Stylist>) {
    try {
      const response = await fetch(`${API_BASE_URL}/stylists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stylist),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error updating stylist:", error);
      throw error;
    }
  },

  async deleteStylist(id: string): Promise<Response> {
    try {
      const response = await fetch(`${API_BASE_URL}/stylists/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error("Error deleting stylist:", error);
      throw error;
    }
  },
};
