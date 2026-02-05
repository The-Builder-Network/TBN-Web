"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function SignupStep5() {
  const [firstName, setFirstName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
      if (formData.tradingName) setTradingName(formData.tradingName);
      if (formData.workAddress) setWorkAddress(formData.workAddress);
      if (formData.postcode) setPostcode(formData.postcode);
    }
  }, []);

  const handleTradingNameChange = (e) => {
    setTradingName(e.target.value);
  };

  const handleWorkAddressChange = (e) => {
    setWorkAddress(e.target.value);
  };

  const handlePostcodeChange = (e) => {
    setPostcode(e.target.value);
  };

  const handleBack = () => {
    router.push("/signup-step-4");
  };

  const handleFinish = () => {
    // Save form data to localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        tradingName,
        workAddress,
        postcode,
      })
    );
    // Navigate to ID Check page
    router.push("/id-check");
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
        {/* Main Content Section: Business Details */}
        <div className="shadow-sm rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-2">
            Enter your business details
          </h2>
          {/* Trading Name */}
          <div className="mb-4">
            <label className="font-inter text-sm text-[#4A4A4A] mb-2 block">
              Trading Name*
            </label>
            <input
              type="text"
              value={tradingName}
              onChange={handleTradingNameChange}
              className="w-full p-2 border border-gray-300 rounded-md font-inter text-base text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              placeholder="Enter your trading name"
            />
          </div>
          {/* Work Address */}
          <div className="mb-4">
            <label className="font-inter text-sm text-[#4A4A4A] mb-2 block">
              Work address*
            </label>
            <input
              type="text"
              value={workAddress}
              onChange={handleWorkAddressChange}
              className="w-full p-2 border border-gray-300 rounded-md font-inter text-base text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              placeholder="Enter your work address"
            />
          </div>
          {/* Postcode Selector */}
          <div className="mb-4">
            <label className="font-inter text-sm text-[#4A4A4A] mb-2 block">
              Postcode*
            </label>
            <input
              type="text"
              value={postcode}
              onChange={handlePostcodeChange}
              className="w-full p-2 border border-gray-300 rounded-md font-inter text-base text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              placeholder="Enter your postcode"
            />
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
              onClick={handleFinish}
              className="w-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}