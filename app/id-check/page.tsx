import React from "react";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function IdCheck() {
  const [firstName, setFirstName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
    }
  }, []);

  const handleBack = () => {
    router.push("/signup-step-5");
  };

  const handleVerifyIdentity = () => {
    // Navigate to the next step of ID verification
    router.push("/id-check/step-2");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-4">
        {/* Top Section: ID Check, Cancel, Progress Bar */}
        <div className="w-full px-4 relative mb-4">
          <button
            onClick={handleCancel}
            className="absolute top-0 right-4 text-[#4A4A4A] font-inter text-sm underline flex items-center"
          >
            Cancel <span className="ml-1">✕</span>
          </button>
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            ID Check
          </h1>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[40%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 2/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Section: Confirm Your Identity */}
        <div className=" rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-8">
            Confirm your identity
          </h2>
          <p className="font-inter text-[17px] text-sm text-[#4A4A4A] mb-8">
            This helps us check that you’re really you. Identity verification is one of the ways we keep The Builder Network secure.
          </p>
          <p className="font-inter text-[17px] text-sm text-[#4A4A4A] mb-8">
            Your ID will be handled securely and won’t be shared with anyone else.
          </p>
          {/* Navigation Buttons */}
          <div className="flex space-x-4 mt-6">
          <button
              onClick={handleBack}
              className="w-1/2 border border-[#4A90E2] text-[#4A90E2] px-4 py-2 rounded-md font-inter text-sm hover:bg-[#E5F0FA] transition"
            >
              Back
            </button>
            <button
              onClick={handleVerifyIdentity}
              className="w-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition"
            >
              Verify Identity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}