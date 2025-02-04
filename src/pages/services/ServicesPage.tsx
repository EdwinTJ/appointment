import { CartSummary } from "@/components/CartSummary";
import ServiceCards from "@/components/ServiceCards";

export function ServicesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-6">
        <CartSummary />
      </div>
      <ServiceCards />
    </div>
  );
}
