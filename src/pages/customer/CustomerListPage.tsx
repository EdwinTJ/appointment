import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { customerService } from "@/services/customerService";
import { Customer } from "@/services/customerService";
import { User, Mail, Phone } from "lucide-react";

export function CustomerListPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const loadAvailabilities = async () => {
    try {
      const data = await customerService.getAll();
      console.log("Availabilities:", data);
      setCustomers(data as Customer[]);
    } catch (error) {
      console.error("Error loading availabilities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Availabilities</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer: Customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <User className="h-4 w-4" />
                <span className="text-sm">
                  {customer.first_name} {customer.last_name}
                </span>
              </TableCell>
              <TableCell>
                {" "}
                <Phone className="h-4 w-4" />
                <span className="text-sm">{customer.phone}</span>
              </TableCell>
              <TableCell>
                {" "}
                <Mail className="h-4 w-4" />
                <span className="text-sm">{customer.email}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
