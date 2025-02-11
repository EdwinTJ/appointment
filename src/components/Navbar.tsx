import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  User,
  Calendar,
  Users,
  Scissors,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  {
    title: "Stylist",
    icon: User,
    subitems: ["list", "add", "delete", "edit"],
  },
  {
    title: "Availability",
    icon: Calendar,
    subitems: ["list", "add", "delete", "edit"],
  },
  {
    title: "Customers",
    icon: Users,
    subitems: ["add", "delete", "edit"],
  },
  {
    title: "Services",
    icon: Scissors,
    subitems: ["list", "add", "delete", "edit"],
  },
];

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isOpen, toggleSidebar }: NavbarProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-md lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-10 ${
          isOpen ? "w-64" : "w-0"
        } lg:w-64 overflow-hidden`}
      >
        <div className="p-4 min-w-64">
          <h2 className="text-2xl font-bold text-gray-800 lg:mt-0 mt-10">
            Admin Dashboard
          </h2>
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
      </nav>
    </>
  );
}
