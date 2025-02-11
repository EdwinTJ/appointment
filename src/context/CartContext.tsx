// src/context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Service } from "@/utils/services";
import { serviceService } from "@/services/serviceService";

export interface CartItem {
  serviceId: string;
  service: Service;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (serviceId: string) => Promise<void>;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalDuration: number;
  isLoading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (serviceId: string) => {
    if (items.some((item) => item.serviceId === serviceId)) return;

    try {
      setIsLoading(true);
      setError(null);
      const service = await serviceService.getServiceById(serviceId);
      setItems([...items, { serviceId, service }]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add service to cart"
      );
      console.error("Error adding to cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (serviceId: string) => {
    setItems(items.filter((item) => item.serviceId !== serviceId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.service.price, 0);
  const totalDuration = items.reduce(
    (sum, item) => sum + item.service.duration,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalDuration,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
