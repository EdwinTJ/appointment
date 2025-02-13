import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "@/utils/services";
import { serviceService } from "@/services/serviceService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service>({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Generate duration options from 30 to 240 minutes (4 hours) in 30-minute increments
  const durationOptions = Array.from({ length: 8 }, (_, i) => (i + 1) * 30);

  // Modified handleInputChange to handle both input and select changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    fieldName?: string
  ) => {
    // If e is a string, it's from the Select component
    if (typeof e === "string" && fieldName) {
      setService((prev) => ({
        ...prev,
        [fieldName]: Number(e),
      }));
    } else if (typeof e === "object") {
      // Handle regular input changes
      const { name, value } = e.target;
      setService((prev) => ({
        ...prev,
        [name]: name === "price" ? Number(value) : value,
      }));
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!id) return;
        const data = await serviceService.getServiceById(id);
        setService(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch service"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!id) return;

      // Validate required fields
      if (
        !service.name ||
        !service.description ||
        !service.price ||
        !service.duration
      ) {
        setError("Please fill in all required fields");
        return;
      }

      // Validate numeric fields
      if (service.price <= 0 || service.duration <= 0) {
        setError("Price and duration must be positive numbers");
        return;
      }

      // const updatedService = await serviceService.updateService(id, service);
      setSuccessMessage("Service updated successfully");

      // Navigate back after short delay
      setTimeout(() => {
        navigate("/admin/services/list");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update service");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading service...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/services/list")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Service</h1>
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
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={service.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={service.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={service.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes) *</Label>
            <Select
              value={service.duration.toString()}
              onValueChange={(value) => handleInputChange(value, "duration")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((duration) => (
                  <SelectItem key={duration} value={duration.toString()}>
                    {duration} minutes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={service.image || ""}
              onChange={handleInputChange}
            />
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
