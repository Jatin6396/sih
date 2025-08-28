import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/Theme/theme-toggle";
import { Code, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className={`flex items-center space-x-2 transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <Code className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-2xl font-bold text-foreground">MyCodeCraft</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">Pricing</a>
            <a href="#community" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">Community</a>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="hover:scale-105 transition-transform duration-200 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">Sign Up</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-9 w-9 px-0">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#community" className="block text-muted-foreground hover:text-foreground transition-colors">Community</a>
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
