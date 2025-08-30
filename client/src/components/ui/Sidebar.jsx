import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  Users,
  FileText,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "DashBoard" },
    { icon: <Users size={20} />, label: "Products" },
    { icon: <FileText size={20} />, label: "Orders" },
  ];
  const navigate = useNavigate();
  
  return (
    <>
      {/* Fixed Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-400 text-white transition-all duration-300 ease-in-out z-40 ${
          isCollapsed ? "w-20" : "w-64"
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-white">
          {!isCollapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-gray-600"
          >
            {isCollapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-600 transition-colors ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <span
                      onClick={() =>
                        navigate(`/pharmacy/${item.label.toLowerCase()}`)
                      }
                      className="flex-shrink-0"
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span
                        onClick={() =>
                          navigate(`/pharmacy/${item.label.toLowerCase()}`)
                        }
                        className="ml-3"
                      >
                        {item.label}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div
          className={`p-4 border-t border-white ${
            isCollapsed ? "text-center" : "flex items-center"
          }`}
        >
          {!isCollapsed && (
            <div className="ml-3">
              <Button
                variant={"link"}
                className={"text-white"}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate('/signin')
                }}
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area with proper margin */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-20" : "ml-64"
        } min-h-screen`}
      >
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;