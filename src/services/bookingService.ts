import { Customer, Appointment } from "../utils/booking";
import {
  DBAppointment,
  TransformedAppointment,
  AppointmentService,
} from "../utils/appointment";

const API_BASE_URL = "http://localhost:3000/api";

export const bookingService = {
  // Create new customer or get existing one by email
  async createOrGetCustomer(
    customerData: Omit<Customer, "id">
  ): Promise<Customer> {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/find-or-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      console.error("Error in createOrGetCustomer:", error);
      throw error;
    }
  },

  // Create new appointment
  async createAppointment(
    appointmentData: Omit<Appointment, "id">
  ): Promise<Appointment> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      console.error("Error in createAppointment:", error);
      throw error;
    }
  },

  // Get customer appointments
  async getCustomerAppointments(customerId: number): Promise<Appointment[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/customers/${customerId}/appointments`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      console.error("Error in getCustomerAppointments:", error);
      throw error;
    }
  },

  async getAppointmentById(
    appointmentId: number
  ): Promise<TransformedAppointment> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/appointments/${appointmentId}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const dbAppointment: DBAppointment = await response.json();

      // Transform the appointment data to match the TransformedAppointment interface
      const transformedAppointment: TransformedAppointment = {
        id: dbAppointment.id,
        date: new Date(dbAppointment.appointment_date),
        time: dbAppointment.appointment_time,
        status: dbAppointment.status,
        totalAmount: dbAppointment.total_amount,
        customer: {
          id: dbAppointment.customer_id,
          firstName: dbAppointment.first_name,
          lastName: dbAppointment.last_name,
          email: dbAppointment.email,
          phone: dbAppointment.phone,
        },
        services: dbAppointment.services.filter(
          (service): service is AppointmentService =>
            service !== null && service.id !== null
        ),
        createdAt: new Date(dbAppointment.created_at),
        updatedAt: new Date(dbAppointment.updated_at),
      };

      return transformedAppointment;
    } catch (error) {
      console.error("Error in getAppointmentById:", error);
      throw error;
    }
  },
};
