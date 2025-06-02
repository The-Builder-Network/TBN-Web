"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function SignupStep2() {
  const [firstName, setFirstName] = useState("");
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
    }
  }, []);

  const trades = [
    "Architect",
    "Architectural Designer",
    "Interior Designer",
    "Structural Engineer",
    "Civil Engineer",
    "Bathroom Fitter",
    "Kitchen Fitter",
    "Plasterer",
    "Tiler",
    "Flooring Specialist",
    "Bricklayer",
    "Plumber",
    "Electrician",
    "Carpenter",
    "Painter",
    "Builder",
    "Roofer",
    "HVAC Technician",
    "Landscaper",
    "Mason",
    "Welder",
  ];

  const filteredTrades = trades.filter((trade) =>
    trade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTradeChange = (trade) => {
    if (selectedTrades.includes(trade)) {
      setSelectedTrades(selectedTrades.filter((t) => t !== trade));
    } else {
      setSelectedTrades([...selectedTrades, trade]);
    }
  };

  const handleBack = () => {
    router.push("/signup-step-1");
  };

  const handleContinue = () => {
    // Save selected trades to localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({ ...formData, trades: selectedTrades })
    );
    router.push("/signup-step-3");
  };

  const handleCancel = () => {
    // Navigate to homepage or clear form data
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
              <span className="font-inter h-2  font-black text-sm mr-350 text-[#4A4A4A]">
                Step 1/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Section: Trade selection */}
        <div className=" rounded-md p-4 w-full max-w-lg">
          {/* Subheading */}
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            Select up to 5 professions
          </h2>
          {/* Search Trades Subheading */}
          <h3 className="font-inter text-sm text-[#4A4A4A] mb-2">
            Search Trades
          </h3>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="e.g. Electrician"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-6 border border-gray-300 rounded-md font-inter text-base text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          />
          {/* Selected Subheading */}
          <h3 className="font-inter text-sm text-[#4A4A4A] mb-2">
            Selected
          </h3>
          {/* List of Trades */}
          <div className="max-h-60 overflow-y-auto mb-4">
            {filteredTrades.map((trade) => (
              <div
                key={trade}
                className="flex items-center justify-between p-3 mb-2 border border-gray-300 rounded-md bg-[#F5F6F5]"
              >
                <span className="font-inter text-base text-[#4A4A4A]">
                  {trade}
                </span>
                <input
                  type="checkbox"
                  checked={selectedTrades.includes(trade)}
                  onChange={() => handleTradeChange(trade)}
                  className="h-4 w-4 border-gray-300 rounded focus:ring-0 checked:bg-black checked:border-black"
                />
              </div>
            ))}
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