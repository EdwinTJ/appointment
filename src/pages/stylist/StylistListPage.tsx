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
import { Stylist } from "../../utils/stylist";
import { stylistService } from "@/services/stylistService";
import { User, Mail, Phone } from "lucide-react";

export function StylistListPage() {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchStylists = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await stylistService.getAllStylists();
      setStylists(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stylists");
      console.error("Error fetching stylists:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStylists();
  }, [fetchStylists]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleEdit = useCallback(
    (stylistId: string) => {
      navigate(`/admin/stylist/edit/${stylistId}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;

    try {
      const response = await stylistService.deleteStylist(deleteId);

      if (response.status === 204) {
        setStylists((prev) =>
          prev.filter((stylist) => stylist.id !== deleteId)
        );
        setSuccessMessage("Stylist deleted successfully");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete stylist");
    } finally {
      setDeleteId(null);
    }
  }, [deleteId]);

  const handleAdd = useCallback(() => {
    navigate("/admin/stylist/add");
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading stylists...</p>
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
        <h2 className="text-2xl font-bold">Stylists</h2>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add stylists
        </Button>
      </div>

      {stylists.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No services found. Add a new stylists to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {" "}
                <User className="h-4 w-4" />
                <span className="text-sm">Name</span>
              </TableHead>
              <TableHead>
                {" "}
                <Mail className="h-4 w-4" />
                <span className="text-sm">Email</span>
              </TableHead>
              <TableHead>
                {" "}
                <Phone className="h-4 w-4" />
                <span className="text-sm">Phone</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stylists.map((stylist) => (
              <TableRow key={stylist.id}>
                <TableCell className="font-medium">
                  {stylist.firstName}
                </TableCell>
                <TableCell>{stylist.email}</TableCell>
                <TableCell>{stylist.phone}</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(stylist.id!)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {stylist.firstName}</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(stylist.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {stylist.firstName}</span>
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
