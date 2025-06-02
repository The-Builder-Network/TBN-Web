"use client";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function ProfileSetup() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/safety-and-quality/evaluation");
  };

  const handleContinue = () => {
    router.push("/profile-setup/how-it-works");
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
            Get set up for success
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] mb-6">
            ~ 5 mins
          </p>
          <p className="font-inter text-sm text-[#4A4A4A] mb-6">
            You’re almost there!
          </p>
          <p className="font-inter text-sm text-[#4A4A4A] mb-6">
            We want to help you meet your goals and get the leads you want.
          </p>
          <p className="font-inter text-sm text-[#4A4A4A] mb-13">
            In this step, we’ll set up your public profile and guide you through the important steps when using The Builder Network.
          </p>
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