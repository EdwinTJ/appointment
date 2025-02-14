import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        } p-8`}
      >
        <div className="mt-16 lg:mt-0">
          <Outlet />
        </div>{" "}
      </main>
    </div>
  );
}
