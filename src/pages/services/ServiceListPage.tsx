import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Service } from "@/utils/services";
import { useCallback, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { serviceService } from "@/services/serviceService";

export function ServicesTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await serviceService.getAllServices();

      if (!response) {
        throw new Error(`HTTP error! status: ${error}`);
      }

      setServices(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch services");
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleEdit = useCallback((serviceId: string) => {
    // Navigate to edit page or open modal
    navigate(`/services/edit/${serviceId}`);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;

    try {
      const response = await serviceService.deleteService(deleteId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setServices((prev) => prev.filter((service) => service.id !== deleteId));
      setSuccessMessage("Service deleted successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete service");
    } finally {
      setDeleteId(null);
    }
  }, [deleteId]);

  const handleAdd = useCallback(() => {
    navigate("/admin/services/add");
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading services...</p>
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
        <h2 className="text-2xl font-bold">Services</h2>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No services found. Add a new service to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>${service.price}</TableCell>
                <TableCell>{service.duration} minutes</TableCell>
                <TableCell>
                  {/* {service.image ? (
                    <img
                      src={service.image}
                      alt={`${service.name} preview`}
                      className="w-10 h-10 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/api/placeholder/40/40";
                        target.alt = "Placeholder image";
                      }}
                    />
                  ) : (
                    <img
                      src="/api/placeholder/40/40"
                      alt="Placeholder image"
                      className="w-10 h-10 object-cover rounded"
                    />
                  )} */}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(service.id!)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {service.name}</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(service.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {service.name}</span>
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
              service.
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
