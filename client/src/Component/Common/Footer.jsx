import React from "react"
import { Stethoscope, Heart, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Footer() {
    const { t, i18n } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold">{t("brand")}</span>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="sr-only">{t("footer.call")}</span>
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="sr-only">{t("footer.email")}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link to="/doctors" className="hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  {t("footer.findDoctor")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  {t("footer.ourServices")}
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {t("footer.bookAppointment")}
                </Link>
              </li>
              <li>
                <Link to="/emergency" className=" transition-all duration-300 hover:translate-x-1 flex items-center text-red-300 hover:text-red-100">
                  <Phone className="h-4 w-4 mr-2" />
                  {t("footer.emergencyCare")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.contactInfo")}</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t("footer.emergencyLine")}</p>
                  <p className="text-red-300">1-800-JEEVIKA</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t("footer.emailUs")}</p>
                  <p>support@jeevika.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t("footer.location")}</p>
                  <p>123 Health Ave, Medical District</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t("footer.service")}</p>
                  <p>{t("footer.alwaysAvailable")}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Policies and Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.policies")}</h3>
            <ul className="space-y-3 text-slate-300">
              <li><Link to="/privacy" className="hover:text-white transition-all duration-300 hover:translate-x-1">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-all duration-300 hover:translate-x-1">{t("footer.terms")}</Link></li>
              <li><Link to="/hipaa" className="hover:text-white transition-all duration-300 hover:translate-x-1">{t("footer.hipaa")}</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-all duration-300 hover:translate-x-1">{t("footer.faq")}</Link></li>
              <li><Link to="/insurance" className="hover:text-white transition-all duration-300 hover:translate-x-1">{t("footer.insurance")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Emergency Notice and Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <div className="bg-red-900/30 p-3 rounded-lg mb-4">
            <p className="text-red-100 text-sm font-medium">
              <span className="font-bold">{t("footer.emergencyNoticeTitle")}</span>{" "}
              {t("footer.emergencyNotice")}
            </p>
          </div>
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} {t("brand")} Telemedicine. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
