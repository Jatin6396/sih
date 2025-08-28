import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FileCode2,
  Users,
  Trophy,
  Settings as SettingsIcon,
  ShieldAlert,
  LayoutDashboard,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../utils/authSlice";

export default function AdminPanel() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Your logout logic here
    alert("Logging out...");
    dispatch(logoutUser());
  };

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] border-r border-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-extrabold text-yellow-400 mb-8 tracking-wide">
          Admin Panel
        </h2>

        <nav className="space-y-3 flex flex-col">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
          >
            <Link to="/admin/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
          >
            <Link to="/admin/problem">
              <FileCode2 className="w-4 h-4 mr-2" /> Problems
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
          >
            <Link to="/admin/users">
              <Users className="w-4 h-4 mr-2" /> Users
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
          >
            <Link to="/admin/contests">
              <Trophy className="w-4 h-4 mr-2" /> Contests
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
          >
            <Link to="/admin/statistics">
              <BarChart3 className="w-4 h-4 mr-2" /> Statistics
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
          >
            <Link to="/admin/reports">
              <ShieldAlert className="w-4 h-4 mr-2" /> Reports
            </Link>
          </Button>

          {/* Settings button with dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all flex items-center gap-2"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <SettingsIcon className="w-4 h-4" /> Settings ▼
            </Button>

            {settingsOpen && (
              <div className="absolute left-0 mt-1 w-full rounded-md bg-[#1a1a1a] border border-gray-700 shadow-lg z-20">
                <Button
                  variant="ghost"
                  className="w-full text-left hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-800 text-sm text-gray-500">
          CodeCraft Admin © {new Date().getFullYear()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
