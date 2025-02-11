export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface Appointment {
  id?: number;
  customerId: number;
  stylistId: number;
  appointmentDate: Date;
  appointmentTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalAmount: number;
  services: Array<{
    serviceId: number;
    price: number;
  }>;
}
