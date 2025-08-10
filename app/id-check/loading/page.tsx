import React from "react";
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";

export default function IdCheckLoading() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/safety-and-quality");
    }, 5000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-4">
        {/* Top Section: Checking Your Identity, Progress Bar */}
        <div className="w-full px-4 relative mb-4">
          <button
            onClick={() => {
              localStorage.removeItem("signupFormData");
              router.push("/");
            }}
            className="absolute top-0 right-4 text-[#4A4A4A] font-inter text-sm underline flex items-center"
          >
            Cancel <span className="ml-1">✕</span>
          </button>
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            Checking your identity
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
        {/* Main Content Section: Loading Dots */}
        <div className="rounded-md mt-10 p-4 w-full max-w-lg flex flex-col items-center">
          {/* Three Blue Dots Animation */}
          <div className="flex space-x-2 mb-6">
            <div className="w-4 h-4 bg-[#4A90E2] rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-4 h-4 bg-[#4A90E2] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-4 h-4 bg-[#4A90E2] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            Checking your identity
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] mb-6">
            This may take a minute...
          </p>
        </div>
      </div>
      {/* CSS for Bouncing Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}