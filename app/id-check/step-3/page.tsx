import React from "react";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../../components/Header";

export default function IdCheckStep3() {
  const [firstName, setFirstName] = useState("");
  const [idType, setIdType] = useState("");
  const [idFile, setIdFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
      setIdType(formData.idType || "");
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdFile(file);
      const savedFormData = localStorage.getItem("signupFormData");
      const formData = savedFormData ? JSON.parse(savedFormData) : {};
      localStorage.setItem(
        "signupFormData",
        JSON.stringify({
          ...formData,
          idFileName: file.name,
        })
      );
    }
  };

  const handleBack = () => {
    router.push("/id-check/step-2");
  };

  const handleSubmit = () => {
    if (!idFile) {
      alert("Please upload an ID file before submitting.");
      return;
    }
    router.push("/id-check/loading");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  const formatIdType = (type) => {
    if (!type) return "identity card";
    return type
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
          <button
            onClick={handleBack}
            className="text-[#4A4A4A] font-inter text-sm flex items-center mb-2"
          >
            <span className="mr-1">←</span> Back
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
        <div className="shadow-sm rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            Review your {formatIdType(idType).toLowerCase()}
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] mb-10">
            Make sure your entire ID is clear, well-lit and fits inside the frame.
          </p>
          <div className="mb-6">
            <label className="relative block w-64 h-64 mx-auto border-2 border-dashed border-gray-300 rounded-md bg-gray-100 cursor-pointer flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="font-inter text-base text-[#4A4A4A]">
                {idFile ? idFile.name : "Upload your ID"}
              </span>
              <Image
                src="/icons/pencil.svg"
                alt="Pencil Icon"
                width={24}
                height={24}
                className="absolute bottom-4 right-4"
              />
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition mt-6"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}