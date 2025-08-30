import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, User, MapPin, Phone, FilePlus } from "lucide-react";
import { useSelector } from "react-redux";

export default function PharmacyRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    pharmacyName: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
    phone: "",
    documents: [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For address subfields
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      documents: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
    
     try {
    const response = await axios.post("http://localhost:5500/api/v1/user/pharmacy/signup", formData);
       console.log(formData);
    if (response.data.success) {
      alert("Pharmacy Owner registered successfully!");

    } else {
      alert(response.data.message || "Registration failed.");
    }
  } catch (error) {
    console.error("Registration error:", error.message);
    alert("Something went wrong. Please try again.");
  }

   
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Pharmacy Owner Registration
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.toLowerCase().includes("error") || message.toLowerCase().includes("exists")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Pharmacy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name</label>
            <input
              type="text"
              name="pharmacyName"
              required
              value={formData.pharmacyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Pharmacy or Drugstore name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Create a secure password"
              />
            </div>
          </div>

          {/* Address Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="address.street"
                required
                value={formData.address.street}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Street"
              />
              <input
                type="text"
                name="address.city"
                required
                value={formData.address.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="City"
              />
              <input
                type="text"
                name="address.state"
                required
                value={formData.address.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="State"
              />
              <input
                type="text"
                name="address.postalCode"
                required
                value={formData.address.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Postal Code"
              />
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                placeholder="Country"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., +91 98765 43210"
              />
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
            <div className="relative">
              <FilePlus className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="file"
                name="documents"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload license or certifications (PDF, JPG, PNG)</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register Pharmacy"}
          </button>
        </form>
      </div>
    </div>
  );
}
