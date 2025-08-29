import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/Theme/theme-toggle";
import { Stethoscope, Menu, X, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 shadow-md border-b border-slate-200 dark:border-slate-800 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 transition-all duration-700">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">
                {t("brand")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium"
            >
              {t("services")}
            </a>
            <a
              href="#how-it-works"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium"
            >
              {t("howItWorks")}
            </a>
            <a
              href="#testimonials"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium"
            >
              {t("testimonials")}
            </a>
            <Link to="/doctors">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition-transform duration-200 flex items-center gap-1"
              >
                <User className="h-4 w-4" />
                {t("doctors")}
              </Button>
            </Link>
            <ThemeToggle />

            {/* Language Selector */}
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>

            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform duration-200 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                {t("patientLogin")}
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="hover:scale-105 transition-transform duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                {t("signup")}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9 px-0"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {t("services")}
              </a>
              <a
                href="#how-it-works"
                className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {t("howItWorks")}
              </a>
              <a
                href="#testimonials"
                className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {t("testimonials")}
              </a>
              <Link
                to="/doctors"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {t("doctors")}
              </Link>

              <div className="flex space-x-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Link to="/login" className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    {t("patientLogin")}
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    {t("signup")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );


}

