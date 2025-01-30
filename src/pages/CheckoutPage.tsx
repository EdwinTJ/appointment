// src/pages/CheckoutPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronLeft, CreditCard } from "lucide-react";

interface GuestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const [guestFormData, setGuestFormData] = useState<GuestFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/");
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleGuestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header for Mobile */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex items-center h-14 max-w-screen-xl">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigate("/calendar")}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Calendar</span>
          </Button>
        </div>
      </div>

      <main className="container max-w-screen-xl mx-auto p-4 sm:p-6 pb-24 sm:pb-6">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-3 space-y-4">
            {/* Customer Information */}
            <Card>
              <CardHeader className="sm:p-6">
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="sm:p-6">
                <Tabs defaultValue="guest" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="guest">Guest</TabsTrigger>
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                  </TabsList>

                  <TabsContent value="guest">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={guestFormData.firstName}
                            onChange={handleGuestInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={guestFormData.lastName}
                            onChange={handleGuestInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={guestFormData.email}
                          onChange={handleGuestInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={guestFormData.phone}
                          onChange={handleGuestInputChange}
                          required
                        />
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="signin">
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input id="signin-email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input id="signin-password" type="password" required />
                      </div>
                      <Button className="w-full">Sign In</Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader className="sm:p-6">
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="sm:p-6">
                <div className="space-y-4">
                  <Alert>
                    <CreditCard className="h-4 w-4" />
                    <AlertTitle>Payment Integration</AlertTitle>
                    <AlertDescription>
                      Integrate your payment processor here
                    </AlertDescription>
                  </Alert>
                  <div className="h-40 rounded-md border-2 border-dashed flex items-center justify-center text-muted-foreground">
                    Payment Form Placeholder
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary - Right Side */}
          <div className="lg:col-span-2 mt-4 lg:mt-0">
            <div className="lg:sticky lg:top-20">
              <Card>
                <CardHeader className="sm:p-6">
                  <CardTitle>Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="sm:p-6">
                  <div className="space-y-6">
                    {/* Appointment Details */}
                    <div>
                      <h3 className="font-medium mb-2">Appointment Details</h3>
                      <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm">
                          Thursday, February 1, 2024 at 10:00 AM
                        </p>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h3 className="font-medium mb-2">Selected Services</h3>
                      <div className="space-y-2">
                        {items.map(({ serviceId, service }) => (
                          <div
                            key={serviceId}
                            className="flex justify-between text-sm py-2"
                          >
                            <span className="capitalize">{serviceId}</span>
                            <span>{formatPrice(service.price)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>{formatPrice(totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Sticky Footer for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 lg:hidden">
          <Button className="w-full">
            Confirm & Pay {formatPrice(totalPrice)}
          </Button>
        </div>
      </main>
    </div>
  );
}
