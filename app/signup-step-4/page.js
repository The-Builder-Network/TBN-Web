"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function SignupStep4() {
  const [firstName, setFirstName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
      if (formData.businessType) setBusinessType(formData.businessType);
    }
  }, []);

  const handleBusinessTypeChange = (e) => {
    setBusinessType(e.target.value);
  };

  const handleBack = () => {
    router.push("/signup-step-3");
  };

  const handleContinue = () => {
    // Save form data to localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        businessType,
      })
    );
    router.push("/signup-step-5");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-4">
        {/* Top Section: Work details, Cancel, Progress Bar */}
        <div className="w-full px-4 relative mb-4">
          <button
            onClick={handleCancel}
            className="absolute top-0 right-4 text-[#4A4A4A] font-inter text-sm underline flex items-center"
          >
            Cancel <span className="ml-1">✕</span>
          </button>
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            Work details
          </h1>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[20%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 1/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Section: Business Type Selection */}
        <div className="shadow-sm rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-2">
            What type of business do you have?
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] mb-4">
            Select the type of business you operate.
          </p>
          {/* Business Type Cards */}
          <div className="flex flex-col space-y-4">
            {/* Sole Trader Card */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                businessType === "sole-trader"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="businessType"
                value="sole-trader"
                checked={businessType === "sole-trader"}
                onChange={handleBusinessTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Self employed / sole trader
              </span>
            </label>
            {/* Limited Company Card */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                businessType === "limited-company"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="businessType"
                value="limited-company"
                checked={businessType === "limited-company"}
                onChange={handleBusinessTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Limited company (LTD)
              </span>
            </label>
            {/* Partnership Card */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                businessType === "partnership"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="businessType"
                value="partnership"
                checked={businessType === "partnership"}
                onChange={handleBusinessTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Ordinary partnership
              </span>
            </label>
            {/* Other Card */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                businessType === "other"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="businessType"
                value="other"
                checked={businessType === "other"}
                onChange={handleBusinessTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Limited liability partnership (LLP)
              </span>
            </label>
          </div>
          {/* Navigation Buttons */}
          <div className="flex space-x-4 mt-6">
          <button
              onClick={handleBack}
              className="w-1/2 border border-[#4A90E2] text-[#4A90E2] px-4 py-2 rounded-md font-inter text-sm hover:bg-[#E5F0FA] transition"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="w-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}