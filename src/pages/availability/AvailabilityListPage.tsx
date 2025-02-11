import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { availabilityService } from "@/services/availabilityService";
import { useNavigate } from "react-router-dom";

export function AvailabilityListPage() {
  const [availabilities, setAvailabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const stylistId = 1;

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const loadAvailabilities = async () => {
    try {
      const data = await availabilityService.getAvailabilityByStylistId(
        stylistId
      );
      console.log("Availabilities:", data);
      setAvailabilities(data);
    } catch (error) {
      console.error("Error loading availabilities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this availability?")) {
      return;
    }

    try {
      await availabilityService.delete(id);
      console.log("Deleted availability with id: ", id);
      loadAvailabilities();
    } catch (error) {
      console.error("Error deleting availability:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Availabilities</h1>
        <Button onClick={() => navigate("/admin/availability/add")}>
          Add New Availability
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time Slots</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availabilities.map((availability: any) => (
            <TableRow key={availability.id}>
              <TableCell>
                {format(new Date(availability.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>{availability.timeSlots.join(", ")}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate(`/admin/availability/edit/${availability.id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(availability.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
