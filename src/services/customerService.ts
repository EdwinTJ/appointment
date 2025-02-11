const API_BASE_URL = "http://localhost:3000/api";

export interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const customerService = {
  async getAll(): Promise<Customer[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch customers");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  },
};
