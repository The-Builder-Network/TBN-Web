"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function SignupStep1() {
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
    router.push("/signup");
  };

  const handleContinue = () => {
    router.push("/signup-step-2");
  };

  const handleCancel = () => {
    // Placeholder: Navigate to homepage or clear form data
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-4">
        {/* Top Section: Work details, Cancel, Progress Bar */}
        <div className="w-full px-4 relative mb-4">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="absolute top-0 right-4 text-[#4A4A4A] font-inter text-sm underline flex items-center"
          >
            Cancel <span className="ml-1">✕</span>
          </button>
          {/* Work details Heading */}
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            Work details
          </h1>
          {/* Progress Indicator */}
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[20%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            {/* Step Indicator */}
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 1/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps{" "}
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Section: Tell us about yourself and below */}
        <div className="  rounded-md p-4 w-full max-w-lg">
          {/* Tell us about yourself Section */}
          <div>
            <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-5">
              Tell us about yourself
            </h2>
            <p className="font-inter text-sm text-[#4A4A4A] mb-4">~ 2 mins</p>
            <p className="font-inter text-[18px] text-[#4A4A4A] mb-5">
              <span className="font-bold">
                Welcome, {firstName || "tradesperson"}!
              </span>{" "}
              Let’s get started.
            </p>
            <p className="font-inter text-base text-[#4A4A4A] leading-6 mb-6">
              We want to know our tradespeople better, so we can send you the right local leads, matching your skills.
            </p>
            <p className="font-inter text-base text-[#4A4A4A] leading-6 mb-8">
            In this step, we’ll ask you about the work you undertake, your professional status, and location
            </p>
          </div>
          {/* Navigation Buttons */}
          <div className="flex space-x-4">
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

