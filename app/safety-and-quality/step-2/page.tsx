import React from "react";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";

export default function SafetyAndQualityStep2() {
  const [firstName, setFirstName] = useState("");
  const [skillset, setSkillset] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
      if (formData.skillset) setSkillset(formData.skillset);
    }
  }, []);

  const handleSkillsetChange = (e) => {
    setSkillset(e.target.value);
  };

  const handleBack = () => {
    router.push("/safety-and-quality");
  };

  const handleContinue = () => {
    if (!skillset) {
      alert("Please select a skillset before continuing.");
      return;
    }
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        skillset,
      })
    );
    router.push("/safety-and-quality/evaluation-start");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-4">
        <div className="w-full px-4 relative mb-4">
          <button
            onClick={handleCancel}
            className="absolute top-0 right-4 text-[#4A4A4A] font-inter text-sm underline flex items-center"
          >
            Cancel <span className="ml-1">✕</span>
          </button>
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            Safety & Quality
          </h1>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[60%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 3/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        <div className=" rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            Select your strongest skillset
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] mb-6">
            Pass skills evaluations to unlock leads in your areas of expertise.
          </p>
          <div className="flex flex-col space-y-4">
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                skillset === "architecture"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="skillset"
                value="architecture"
                checked={skillset === "architecture"}
                onChange={handleSkillsetChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Architecture
              </span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                skillset === "cad-drawings"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="skillset"
                value="cad-drawings"
                checked={skillset === "cad-drawings"}
                onChange={handleSkillsetChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                CAD-Drawings
              </span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                skillset === "carpentry"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="skillset"
                value="carpentry"
                checked={skillset === "carpentry"}
                onChange={handleSkillsetChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Carpentry
              </span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                skillset === "electrical-work"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="skillset"
                value="electrical-work"
                checked={skillset === "electrical-work"}
                onChange={handleSkillsetChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Electrical Work
              </span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                skillset === "plumbing"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="skillset"
                value="plumbing"
                checked={skillset === "plumbing"}
                onChange={handleSkillsetChange}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                Plumbing
              </span>
            </label>
          </div>
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