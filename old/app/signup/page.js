"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    marketingConsent: false,
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleContinue = () => {
    // Save form data to localStorage
    localStorage.setItem("signupFormData", JSON.stringify(formData));
    // Navigate to the next step
    router.push("/signup-step-1");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-md p-6 max-w-lg w-full">
          <h1 className="font-kollektif text-[36px] font-bold text-[#1F2937] mb-2">
            Create your account
          </h1>
          <p className="font-inter text-base text-[#4A4A4A] mb-6">
            Sign up to be a trades’ person on The Builder Network.
          </p>
          <div className="space-y-6">
            {/* Name Fields */}
            <div>
              <label className="font-inter text-sm text-[#4A4A4A] mb-2 block">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-[#E5E7EB] rounded-md p-2 font-inter text-base focus:border-[#4A90E2] outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-[#E5E7EB] rounded-md p-2 font-inter text-base focus:border-[#4A90E2] outline-none"
                />
              </div>
            </div>
            {/* Phone Number */}
            <div>
              <label className="font-inter text-sm text-[#4A4A4A] mb-2 flex items-center">
                Phone number <span className="text-red-500">*</span>
                <span className="ml-2 inline-block w-4 h-4 rounded-full bg-gray-300 text-white text-xs flex items-center justify-center">?</span>
              </label>
              <div className="flex items-center border border-[#E5E7EB] rounded-md">
                <span className="px-3 text-[#4A4A4A] font-inter text-base border-r border-[#E5E7EB]">
                  +44
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 font-inter text-base focus:border-[#4A90E2] outline-none rounded-r-md"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="font-inter text-sm text-[#4A4A4A] mb-2 block">
                Password (6 characters minimum) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-[#E5E7EB] rounded-md">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 font-inter text-base focus:border-[#4A90E2] outline-none rounded-l-md"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-[#4A4A4A] font-inter text-base border-l border-[#E5E7EB]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleInputChange}
                className="mt-1 mr-2 border-[#E5E7EB] rounded focus:ring-[#4A90E2]"
              />
              <label className="font-inter text-sm text-[#4A4A4A]">
                I would like to receive marketing communications about The Builder Network services and offers by email, SMS, and/or phone and understand that I can unsubscribe at any time.
              </label>
            </div>
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-[#4A90E2] text-white px-6 py-3 rounded-md font-inter text-base hover:bg-[#357ABD] transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}