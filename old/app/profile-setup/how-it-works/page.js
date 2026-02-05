"use client";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";

export default function HowItWorks() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/profile-setup");
  };

  const handleContinue = () => {
    router.push("/profile-setup/introduce-yourself");
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
        <div className=" rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            How it works
          </h2>
          <div className="flex items-start mb-6">
            <div className="w-[21px] h-[58px] rounded-full flex items-center justify-center">
              <span className="font-inter text-[60px]  text-[#A1C5FF] text-base font-bold">
                1
              </span>
            </div>
            <div className="ml-9">
              <h4 className="font-kollektif text-[18px] font-bold text-[#1F2937]">
                Pick the leads you want
              </h4>
              <p className="font-inter text-sm text-[#4A4A4A] mt-2">
                Choose the leads you’re interested in and send each customer an introductory message. Expressing interest in leads is totally free of charge.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="w-[21px] h-[58px] rounded-full flex items-center justify-center">
              <span className="font-inter text-[60px]  text-[#A1C5FF] text-base font-bold">
                2
              </span>
            </div>
            <div className="ml-9">
              <h4 className="font-kollektif text-[18px] font-bold text-[#1F2937]">
                Get shortlisted
              </h4>
              <p className="font-inter text-sm text-[#4A4A4A] mt-2">
              If the customer likes your message and profile, they’ll shortlist you. We’ll send you the customer’s verified phone number, and you’ll be charged a shortlist fee.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="w-[21px] h-[58px] rounded-full flex items-center justify-center">
              <span className="font-inter text-[60px]  text-[#A1C5FF] text-base font-bold">
                3
              </span>
            </div>
            <div className="ml-9">
              <h4 className="font-kollektif text-[18px] font-bold text-[#1F2937]">
                Respond and get hired
              </h4>
              <p className="font-inter text-sm text-[#4A4A4A] mt-2 mb-8">
              When you’re shortlisted, the customer is expecting your call. Follow up quickly for the best chance of getting hired for the job.
              </p>
            </div>
          </div>

          <div className="flex space-x-4 mt-12 ">
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