import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Service } from "@/utils/services";
export function AddService() {
  const [service, setService] = useState<Omit<Service, "id">>({
    price: 25.0,
    name: "",
    description: "",
    duration: 30,
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      console.log("Service created:", data);
      alert("Service created successfully");
      navigate(`/admin`);
      // Reset form or redirect as needed
    } catch (error) {
      console.error("Error creating service:", error);
      // Handle error (show message to user, etc.)
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={service.name}
                onChange={handleChange}
                placeholder="e.g., Haircut"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={service.price}
                onChange={handleChange}
                placeholder="25.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={service.description}
                onChange={handleChange}
                placeholder="A professional haircut and styling."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={service.duration}
                onChange={handleChange}
                placeholder="30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={service.image}
                onChange={handleChange}
                placeholder="https://example.com/haircut.jpg"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Add Service
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
