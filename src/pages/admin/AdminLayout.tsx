import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
