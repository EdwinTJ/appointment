import { CartSummary } from "@/components/CartSummary";
import ServiceCards from "@/components/ServiceCards";
import AboutMe from "@/pages/About";
export function ServicesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-6">
        <CartSummary />
      </div>
      <AboutMe />
      <div className="mt-12">
        {" "}
        <ServiceCards />
      </div>
    </div>
  );
}
