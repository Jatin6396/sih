import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Stethoscope,
  Shield,
  Pill,
  ArrowRight,
  Heart
} from "lucide-react";

export default function Signup() {
  const [activeButton, setActiveButton] = useState(null);

  const userTypes = [
    {
      id: "patient",
      title: "Signup as Patient",
      description: "Access your medical records, book appointments, and consult with doctors",
      icon: User,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      path: "/patient-login"
    },
    {
      id: "doctor",
      title: "Signup as Doctor",
      description: "Access your dashboard, manage appointments, and consult with patients",
      icon: Stethoscope,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      path: "/doctor-login"
    },
    {
      id: "pharmacist",
      title: "Signup as Pharmacist",
      description: "Manage prescriptions, inventory, and medication orders",
      icon: Pill,
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      path: "/pharmacist-login"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl mr-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Jeevika Telemedicine</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to Jeevika's secure healthcare portal. Please select your login type to continue.
          </p>
        </div>

        {/* Login Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userTypes.map((user) => {
            const IconComponent = user.icon;
            return (
              <div 
                key={user.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 ${
                  activeButton === user.id ? 'border-blue-500' : 'border-transparent'
                }`}
                onMouseEnter={() => setActiveButton(user.id)}
                onMouseLeave={() => setActiveButton(null)}
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${user.color} mr-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{user.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">{user.description}</p>
                  <Link to={user.path}>
                    <button 
                      className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${user.color} ${user.hoverColor} text-white font-medium transition-all duration-300 flex items-center justify-center`}
                    >
                        {user.title.split(' ')[0]}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Notice */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Medical Emergency?</h3>
          <p className="text-red-600">
            If you are experiencing a medical emergency, please call your local emergency number immediately.
          </p>
          <a href="tel:108" className="inline-block mt-4 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
            Call Emergency: 108
          </a>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center text-gray-500">
          <p>Need help? Contact our support team at <a href="mailto:support@jeevika.com" className="text-blue-600 hover:underline">support@jeevika.com</a></p>
          <p className="mt-2">Or call us at <a href="tel:+18001234567" className="text-blue-600 hover:underline">+1 (800) 123-JEEVIKA</a></p>
        </div>
      </div>
    </div>
  );
}