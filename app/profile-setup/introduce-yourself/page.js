"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../../components/Header";

export default function IntroduceYourself() {
  const [description, setDescription] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      if (formData.description) {
        setDescription(formData.description);
        setWordCount(formData.description.split(/\s+/).filter(Boolean).length);
      }
    }
  }, []);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const words = text.split(/\s+/).filter(Boolean).length;
    if (words <= 1250) {
      setDescription(text);
      setWordCount(words);
    }
  };

  const handleBack = () => {
    router.push("/profile-setup/how-it-works");
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      alert("Please enter a description before submitting.");
      return;
    }
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        description,
      })
    );
    router.push("/payment-method");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header isOnboarding={true} />
      <div className="flex-grow flex flex-col items-center p-4">
        <div className="w-full px-4 relative mb-4">
          <button
            onClick={handleCancel}
            className="absolute top-0 right-4 text-[#4A4A4A] font-inter text-sm underline flex items-center"
          >
            Cancel <span className="ml-1">✕</span>
          </button>
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            Profile Setup
          </h1>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[80%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 4/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            Introduce yourself to future customers
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] mb-6">
            This is your chance to make a great first impression. You can always make edits later in your profile.
          </p>
          <div className="flex items-center space-x-2 mb-6">
            <Image
              src="/icons/info.svg"
              alt="Info Icon"
              width={20}
              height={20}
            />
            <p className="font-inter text-sm text-[#4A4A4A]">
              A quality description can increase your chances of getting hired.
            </p>
          </div>
          <p className="font-inter text-sm text-[#4A90E2] underline mb-6">
            Get writing tips
          </p>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full h-48 border border-gray-300 rounded-md p-2 font-inter text-base text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            placeholder="Enter your description here..."
          />
          <p className="font-inter text-sm text-[#4A4A4A] mt-2 text-right">
            {wordCount}/1250
          </p>
          <div className="flex space-x-4 mt-6">
          <button
              onClick={handleBack}
              className="w-1/2 border border-[#4A90E2] text-[#4A90E2] px-4 py-2 rounded-md font-inter text-sm hover:bg-[#E5F0FA] transition"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="w-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}