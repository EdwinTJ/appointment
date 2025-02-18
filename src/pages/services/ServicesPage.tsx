import { CartSummary } from "@/components/CartSummary";
import ServiceCards from "@/components/ServiceCards";
import AboutMe from "@/pages/About";
import Login from "@/components/Login";

export function ServicesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <Login />
        <CartSummary />
      </div>
      <AboutMe />
      <div className="mt-12">
        <ServiceCards />
      </div>
    </div>
  );
}

export default ServicesPage;
