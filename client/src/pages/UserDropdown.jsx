
import { useState, useRef, useEffect } from "react"
import { User, Settings, Shield, LogOut, Trophy, BookOpen, Star, ChevronDown, Crown, BarChart3 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "@/utils/authSlice" // ✅ make sure this exists
import { Link } from "react-router"

const UserDropdown = ({ username = "CodeMaster" }) => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  console.log("hii"+user, isAuthenticated);
 username = (user?.firstName || username);
username = username.charAt(0).toUpperCase() + username.slice(1);
  

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  
   const handleLogout = () => {
    dispatch(logoutUser())
  }

  
  const menuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: BarChart3, label: "Progress", href: "/progress" },
    { icon: Trophy, label: "Achievements", href: "/achievements" },
    { icon: Star, label: "Favorites", href: "/favorites" },
    { icon: BookOpen, label: "Study Plan", href: "/study-plan" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Crown, label: "Premium", href: "/premium", premium: true },
    // ✅ Only show Admin Panel if authenticated & role is admin
    ...(isAuthenticated && user?.role==='admin'
      ? [{ icon: Shield, label: "Admin Panel", href:"/admin", admin: true }]
      : []),
    { icon: LogOut, label: "Sign Out", href: "/logout", danger: true },
  ]

  const handleItemClick = (item) => {
    if (item.label === "Sign Out") {
      handleLogout()
    }
    else if(item.label==="Admin Panel"){
      // Navigate to admin panel
      window.location.href="/admin"
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
          {username.charAt(0)}
        </div>
        <span className="hidden md:block text-sm font-medium text-foreground">{username}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                {username.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-foreground">{username}</div>
                <div className="text-xs text-muted-foreground">{isAuthenticated ? "Premium Member" : "Guest"}</div>
              </div>
            </div>
          </div>

          <div className="py-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors ${
                    item.danger
                      ? "text-red-600 hover:text-red-700"
                      : item.premium
                        ? "text-yellow-600 hover:text-yellow-700"
                        : item.admin
                          ? "text-blue-600 hover:text-blue-700"
                          : "text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.premium && <Crown className="w-3 h-3 text-yellow-500 ml-auto" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
