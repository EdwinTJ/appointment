import { services } from "@/utils/services";
import { Clock, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";

export default function ServiceCards() {
  const { items, addToCart, removeFromCart } = useCart();

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(services).map(([serviceId, service]) => {
        const isInCart = items.some((item) => item.serviceId === serviceId);

        return (
          <Card key={serviceId} className="flex flex-col">
            {service.image && (
              <div className="relative w-full pt-48">
                <img
                  src="/api/placeholder/400/320"
                  alt={serviceId}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="capitalize">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(service.duration)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatPrice(service.price)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={isInCart ? "secondary" : "default"}
                onClick={() =>
                  isInCart ? removeFromCart(serviceId) : addToCart(serviceId)
                }
              >
                {isInCart ? "Remove" : "Book Now"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
