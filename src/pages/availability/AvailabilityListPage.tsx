import { useEffect, useState, useCallback } from "react";
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
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { availabilityService } from "@/services/availabilityService";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import type { Availability } from "../../utils/availability";

export interface Availability {
  id?: string;
  date: Date;
  timeSlots: string[];
  stylist?: string;
}
export function AvailabilityListPage() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const stylistId = 1; // TODO: Get this from context or props

  const loadAvailabilities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await availabilityService.getAvailabilityByStylistId(
        stylistId
      );
      setAvailabilities(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch availabilities"
      );
      console.error("Error loading availabilities:", err);
    } finally {
      setIsLoading(false);
    }
  }, [stylistId]);

  useEffect(() => {
    loadAvailabilities();
  }, [loadAvailabilities]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleEdit = useCallback(
    (availabilityId: string) => {
      navigate(`/admin/availability/edit/${availabilityId}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;

    try {
      await availabilityService.delete(deleteId);
      setAvailabilities((prev) =>
        prev.filter((availability) => availability.id !== deleteId)
      );
      setSuccessMessage("Availability deleted successfully");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete availability"
      );
    } finally {
      setDeleteId(null);
    }
  }, [deleteId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading availabilities...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-4">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Availabilities</h2>
        <Button onClick={() => navigate("/admin/availability/add")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Availability
        </Button>
      </div>

      {availabilities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No availabilities found. Add availability slots to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time Slots</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availabilities.map((availability) => (
              <TableRow key={availability.id}>
                <TableCell>
                  {format(new Date(availability.date), "MMMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {availability.timeSlots.map((slot) => (
                      <span
                        key={slot}
                        className="inline-block px-2 py-1 text-sm bg-secondary rounded-md"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(availability.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">
                      Edit availability for{" "}
                      {format(new Date(availability.date), "MMM d")}
                    </span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(availability.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">
                      Delete availability for{" "}
                      {format(new Date(availability.date), "MMM d")}
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              availability slots.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
