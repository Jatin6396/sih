import { Routes,Route,Navigate } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./utils/authSlice";
import { useEffect } from "react";
import Check from "./pages/check"
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/Homepage";
import Dashboard from "./pages/Pharmacy/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PharmacyProductsTable from "./pages/Pharmacy/PharmacyProductsTable";
import OrderManagement from "./pages/Pharmacy/OrderManagement";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import AppointmentRequests from "./pages/Doctor/Appointments";
import DoctorsListingPage from "./pages/Patient/Doctors";
import HHomePage from "./pages/Patient/Profile";
import MedicinePage from "./pages/MedicinePage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/cartContext";


import PatientRegistration from "./Component/Core/PatientLogic";
import DoctorRegistration from "./Component/Core/DoctorLogin";
import PharmacyRegistration from "./Component/Core/Pharmists";
import AdminPanel from "./Component/Dashboard/Admin-dashboard";
// import AdminPanel from "./pages/AdminPanel";


export default function App(){
  const {isAuthenticated,loading,user}=useSelector((state)=>state.auth);
  
  const dispatch=useDispatch();

 console.log("App.js",isAuthenticated,loading,user);


const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo with emerald gradient */}
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-4">
          <svg 
            className="w-8 h-8 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M14 5L21 12M21 12L14 19M21 12H3" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Loader Dots - Emerald theme */}
        <div className="flex space-x-3">
          <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-bounce shadow-lg shadow-emerald-400/50"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-bounce shadow-lg shadow-emerald-400/50 delay-150"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-bounce shadow-lg shadow-emerald-400/50 delay-300"></div>
        </div>

        {/* Loading Text */}
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 text-lg font-semibold animate-pulse">
          Preparing your experience...
        </p>

        {/* Subtle Glass Card Effect */}
        <div className="absolute bottom-10 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl text-xs text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
          Just a moment while we get everything ready ✨
        </div>
      </div>
    </div>
  );
};

// Usage in your component
if (loading) {
  return <LoadingScreen />;
}
  const getDashboardRedirect = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "patient":
        return "/dashboard";
      case "admin":
        return "/admin-dashboard";
      case "doctor":
        return "/doctor/profile";
      case "pharmacyOwner":
        return "/pharmacy/dashboard";
      default:
        return "/login";
    }
  };
  return(
    <>
    <CartProvider userId={"68b0b821d4a3317e0e2f972e"}>
   <Routes>
  {/* Public Routes */}
   <Route path="/" element={<LandingPage />} />
  <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />} />
  
  <Route path="/dashboard" element={ <HomePage /> } />
  <Route path="admin-dashboard" element={<AdminPanel></AdminPanel>}/>
     <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={getDashboardRedirect()} /> : <Login />}
        />
 

  <Route path="/patient-login" element={<PatientRegistration>   </PatientRegistration>}></Route>
  <Route path="/doctor-login" element={<DoctorRegistration></DoctorRegistration>}></Route>
  <Route path="pharmacist-login" element={<PharmacyRegistration></PharmacyRegistration>}></Route>

  {/* pharmacy */}
          <Route path="/pharmacy/dashboard" element={<Dashboard />} />
          <Route
            path="/pharmacy/products"
            element={<PharmacyProductsTable />}
          />
          <Route path="/pharmacy/orders" element={<OrderManagement />} />
         
          {/* doctor */}
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route
            path="/doctor/pending-appointments"
            element={<AppointmentRequests />}
          />
          {/* patient */}
          <Route path="/patient/doctors" element={<DoctorsListingPage />} />
          <Route path="/patient/profile" element={<HHomePage />} />
          {/* medicine + cart */}
          <Route path="/medicine/all" element={<MedicinePage />} />
          <Route path="/cart" element={<CartPage />} />

 
  
</Routes>
 </CartProvider>
    </>
  )
}