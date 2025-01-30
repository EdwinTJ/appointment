// src/context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { services, Service } from "@/utils/services";

export interface CartItem {
  serviceId: string;
  service: Service;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (serviceId: string) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalDuration: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (serviceId: string) => {
    if (!items.some((item) => item.serviceId === serviceId)) {
      setItems([...items, { serviceId, service: services[serviceId] }]);
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
