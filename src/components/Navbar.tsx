import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  User,
  Calendar,
  Users,
  Scissors,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
const navItems = [
  {
    title: "Stylist",
    icon: User,
    subitems: ["list", "add"],
  },
  {
    title: "Availability",
    icon: Calendar,
    subitems: ["list", "add"],
  },
  {
    title: "Customers",
    icon: Users,
    subitems: ["list", "add"],
  },
  {
    title: "Services",
    icon: Scissors,
    subitems: ["list", "add"],
  },
  {
    title: "Appointments",
    icon: Calendar,
    subitems: ["list", "add"],
  },
];

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface StylistInfo {
  firstName: string;
  lastName: string;
  role: string;
}

export default function Navbar({ isOpen, toggleSidebar }: NavbarProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [stylistInfo, setStylistInfo] = useState<StylistInfo | null>(null);
  const navigate = useNavigate();

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  useEffect(() => {
    const storedStylist = localStorage.getItem("stylist");
    if (storedStylist) {
      const parsedStylist = JSON.parse(storedStylist);
      setStylistInfo({
        firstName: parsedStylist.firstName,
        lastName: parsedStylist.lastName,
        role: parsedStylist.role,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("stylist");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "w-64" : "w-0"
        } lg:w-64 overflow-hidden overflow-y-auto`}
      >
        <div className="p-4 min-w-64">
          <h2 className="text-2xl font-bold text-gray-800 lg:mt-0 mt-10">
            Admin Dashboard
          </h2>
          {stylistInfo && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {stylistInfo.firstName} {stylistInfo.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {stylistInfo.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <ul className="space-y-2 p-4 min-w-64">
          {navItems.map((item) => (
            <li key={item.title}>
              <button
                onClick={() => toggleItem(item.title)}
                className="flex w-full items-center justify-between rounded-md p-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="flex items-center">
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openItems.includes(item.title) ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems.includes(item.title) && (
                <ul className="ml-6 mt-2 space-y-1">
                  {item.subitems.map((subitem) => (
                    <li key={subitem}>
                      <Link
                        to={`/admin/${item.title.toLowerCase()}/${subitem}`}
                        className="block rounded-md p-2 text-sm text-gray-600 hover:bg-gray-100"
                      >
                        {subitem.charAt(0).toUpperCase() + subitem.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="p-4 min-w-64">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
