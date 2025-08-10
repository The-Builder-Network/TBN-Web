import React from "react";
"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";

export default function NewLeads() {
  const [activeTab, setActiveTab] = useState("all-leads");

  const leads = [
    {
      title: "Structural Engineer",
      category: "Architecture",
      location: "Edinburgh",
      timePosted: "1hr ago",
    },
    {
      title: "Residential Builder",
      category: "Construction",
      location: "Glasgow",
      timePosted: "3hrs ago",
    },
    {
      title: "Interior Designer",
      category: "Design",
      location: "London",
      timePosted: "5hrs ago",
    },
    {
      title: "Plumbing Specialist",
      category: "Plumbing",
      location: "Manchester",
      timePosted: "8hrs ago",
    },
    {
      title: "Electrical Contractor",
      category: "Electrical",
      location: "Birmingham",
      timePosted: "12hrs ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-5xl px-4 mb-4">
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-4">
            New Leads
          </h1>
          <div className="bg-[#136eff] text-white p-4 rounded-md mb-6">
            <p className="font-inter text-sm">
              Complete your free registration to express interest.{" "}
              <a href="/complete-registration" className="underline">
                Complete now
              </a>
            </p>
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search by keyword, location, or material"
              className="w-full border border-gray-300 rounded-md p-2 font-inter text-base text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#A1C5FF]"
            />
            <button className="bg-[#A1C5FF] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#8EB5FF] transition">
              Search
            </button>
            <button className="text-[#A1C5FF] border border-[#A1C5FF] bg-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#F0F5FF] transition">
              Filters
            </button>
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("all-leads")}
              className={`px-4 py-2 rounded-md font-inter text-sm border transition ${
                activeTab === "all-leads"
                  ? "bg-[#A1C5FF] text-white border-[#A1C5FF]"
                  : "text-black border-black bg-white hover:bg-gray-100"
              }`}
            >
              All Leads
            </button>
            <button
              onClick={() => setActiveTab("low-competition")}
              className={`px-4 py-2 rounded-md font-inter text-sm border transition ${
                activeTab === "low-competition"
                  ? "bg-[#A1C5FF] text-white border-[#A1C5FF]"
                  : "text-black border-black bg-white hover:bg-gray-100"
              }`}
            >
              Low competition
            </button>
          </div>
          <div className="space-y-4">
            {leads.map((lead, index) => (
              <div
                key={index}
                className="flex items-center border rounded-md p-4 bg-white shadow-sm"
              >
                <div className="w-1 h-full bg-[#acccff] mr-4">
                  
                </div>
                <div className="flex-grow">
                  <h4 className="font-kollektif text-[18px] font-bold text-[#A1C5FF] mb-2">
                    {lead.title}
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Image
                        src="/icons/category.svg"
                        alt="Category Icon"
                        width={16}
                        height={16}
                      />
                      <p className="font-inter text-sm text-[#4A4A4A]">
                        {lead.category}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Image
                        src="/icons/location.svg"
                        alt="Location Icon"
                        width={16}
                        height={16}
                      />
                      <p className="font-inter text-sm text-[#4A4A4A]">
                        {lead.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Image
                        src="/icons/clock.svg"
                        alt="Clock Icon"
                        width={16}
                        height={16}
                      />
                      <p className="font-inter text-sm text-[#4A4A4A]">
                        {lead.timePosted}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}