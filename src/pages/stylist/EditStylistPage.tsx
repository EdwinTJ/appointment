import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stylistService } from "@/services/stylistService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EditStylistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stylist, setStylist] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "stylist",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRoleChange = (value: string) => {
    setStylist((prev) => ({
      ...prev,
      role: value,
    }));
  };

  useEffect(() => {
    const fetchStylist = async () => {
      try {
        if (!id) return;
        const data = await stylistService.getStylistById(id);
        setStylist({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          role: data.role,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch stylist"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStylist();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!id) return;

      // Validate required fields
      if (
        !stylist.email ||
        !stylist.firstName ||
        !stylist.lastName ||
        !stylist.phone
      ) {
        setError("Please fill in all required fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(stylist.email)) {
        setError("Please enter a valid email address");
        return;
      }

      // Validate phone format (simple validation, you might want to use a more robust solution)
      const phoneRegex = /^\+?[\d\s-()]{10,}$/;
      if (!phoneRegex.test(stylist.phone)) {
        setError("Please enter a valid phone number");
        return;
      }

      await stylistService.updateStylist(id, stylist);
      setSuccessMessage("Stylist updated successfully");

      // Navigate back after short delay
      setTimeout(() => {
        navigate("/admin/stylist/list");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update stylist");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStylist((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading stylist...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/stylist/list")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Stylist</h1>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={stylist.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={stylist.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={stylist.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={stylist.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={stylist.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="stylist">Stylist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
