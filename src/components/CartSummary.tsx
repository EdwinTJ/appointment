import { useNavigate } from "react-router-dom";
import { ShoppingCart, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "../context/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartSummary() {
  const navigate = useNavigate();
  const { items, removeFromCart, totalPrice, totalDuration } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const handleNextClick = () => {
    navigate("/calendar");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Appointment Summary</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-grow my-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {items.map(({ serviceId, service }) => (
                  <div
                    key={serviceId}
                    className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg"
                  >
                    <div className="flex-grow">
                      <h4 className="font-medium capitalize">{serviceId}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{formatPrice(service.price)}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(service.duration)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(serviceId)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Duration:</span>
                  <span>{formatDuration(totalDuration)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total Price:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleNextClick}>
                Next
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
