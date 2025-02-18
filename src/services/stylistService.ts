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

  // Add to stylistController.ts
  loginStylist: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Get stylist by email
      const stylist = await stylistModel.getByEmail(email);
      if (!stylist) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare password
      const isValidPassword = await comparePassword(password, stylist.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Remove password from response
      const { password: _, ...stylistResponse } = stylist;

      // Here you might want to generate and return a JWT token
      res.status(200).json(stylistResponse);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({
        message: "Error logging in",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
