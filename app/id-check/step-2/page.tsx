import React from "react";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import Header from "../../../components/Header";

export default function IdCheckStep2() {
  const [firstName, setFirstName] = useState("");
  const [idType, setIdType] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
      if (formData.idType) setIdType(formData.idType);
    }
  }, []);

  const handleIdTypeChange = (e) => {
    setIdType(e.target.value);
  };

  const handleBack = () => {
    router.push("/id-check");
  };

  const handleContinue = () => {
    // Save form data to localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        idType,
      })
    );
    // Navigate to the next step of ID verification
    router.push("/id-check/step-3");
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
        {/* Main Content Section: Which ID do you have? */}
        <div className=" rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-9">
            Which ID do you have?
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] font-semibold mb-6 text-[18px]">
            Choose one from the following options:
          </p>
          {/* ID Options List */}
          <div className="flex flex-col space-y-4">
            {/* Passport */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                idType === "passport"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="idType"
                value="passport"
                checked={idType === "passport"}
                onChange={handleIdTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <Image
                src="/icons/identity.svg"
                alt="Document Icon"
                width={20}
                height={20}
                className="mr-2 ml-2"
              />
              <span className="font-inter text-base text-[#4A4A4A]">
                Passport
              </span>
            </label>
            {/* Identity Card */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                idType === "identity-card"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="idType"
                value="identity-card"
                checked={idType === "identity-card"}
                onChange={handleIdTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <Image
                src="/icons/identity.svg"
                alt="Document Icon"
                width={20}
                height={20}
                className="mr-2 ml-2"
              />
              <span className="font-inter text-base text-[#4A4A4A]">
                Identity card
              </span>
            </label>
            {/* Residence Permit */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                idType === "residence-permit"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="idType"
                value="residence-permit"
                checked={idType === "residence-permit"}
                onChange={handleIdTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <Image
                src="/icons/identity.svg"
                alt="Document Icon"
                width={20}
                height={20}
                className="mr-2 ml-2"
              />
              <span className="font-inter text-base text-[#4A4A4A]">
                Residence Permit
              </span>
            </label>
            {/* Driver’s Licence */}
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                idType === "drivers-licence"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="idType"
                value="drivers-licence"
                checked={idType === "drivers-licence"}
                onChange={handleIdTypeChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <Image
                src="/icons/identity.svg"
                alt="Document Icon"
                width={20}
                height={20}
                className="mr-2 ml-2"
              />
              <span className="font-inter text-base text-[#4A4A4A]">
                Driver’s licence
              </span>
            </label>
          </div>
          {/* Info Icon and Paragraph */}
          <div className="flex items-center mt-4">
            <Image
              src="/icons/info.svg"
              alt="Info Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <p className="font-inter text-sm text-[#4A4A4A]">
              Why do we need your identity?
            </p>
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