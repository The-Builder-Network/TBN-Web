import React from "react";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../../components/Header";

export default function EvaluationComplete() {
  const [skillset, setSkillset] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setSkillset(formData.skillset || "");
    }
  }, []);

  const handleContinue = () => {
    router.push("/profile-setup");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  const formatSkillset = (skill) => {
    if (!skill) return "Skillset";
    return skill
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
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
            {formatSkillset(skillset)}
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
        <div className="shadow-sm rounded-md p-4 w-full max-w-lg flex flex-col items-center">
          <Image
            src="/icons/time.svg"
            alt="Time Icon"
            width={94}
            height={94}
            className="mb-6"
          />
          <h3 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            Pending Approval
          </h3>
          <p className="font-inter text-[18px] text-sm text-[#4A4A4A] mb-6">
            We’re currently reviewing your approval.
          </p>
          <button
            onClick={handleContinue}
            className="w-full bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition mt-6"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}