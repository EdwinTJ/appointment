export interface AppointmentService {
  id: number;
  serviceId: string; // UUID
  serviceName: string;
  price: number;
}

export interface AppointmentCustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DBAppointment {
  id: number;
  customer_id: number;
  stylist_id: number;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  total_amount: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  services: AppointmentService[];
}
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface TransformedAppointment {
  id: number;
  date: Date;
  time: string;
  status: AppointmentStatus;
  totalAmount: number;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  services: AppointmentService[];
  createdAt: Date;
  updatedAt: Date;
}
