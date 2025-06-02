
"use client";

import Header from "../../components/Header";
import { useState } from "react";
import Image from "next/image"; // Import Image component for optimized images

export default function Dashboard() {
  // Sample data for tradespeople (matching the Figma design, with 3 images)
  const tradespeople = [
    {
      name: "NESSE",
      rating: 4.8,
      reviews: 260,
      development: "Shoreline developments",
      location: "Active within 1 mile of St James, London",
      image: "/images/profiles/nesse.jpg",
    },
    {
      name: "Array Navy design Itd",
      rating: 4.8,
      reviews: 12,
      development: "",
      location: "Active within 1 mile of St James, London",
      image: "/images/profiles/array-navy.jpg",
    },
    {
      name: "LORD & CONSTRUCTION LTD",
      rating: 5,
      reviews: 7,
      development: "",
      location: "Active within 2 miles of St James, London",
      image: "/images/profiles/lord-construction.jpg",
    },
    // Placeholder data for remaining tradespeople
    {
      name: "ARCHITECTURE RALPH KAN",
      rating: 4.9,
      reviews: 0,
      development: "",
      location: "Active within 4 miles of St James, London",
      image: null,
    },
    {
      name: "RM Design and Management Studios",
      rating: 4.9,
      reviews: 0,
      development: "",
      location: "Active within 1 mile of St James, London",
      image: null,
    },
    {
      name: "SCREEN",
      rating: 5,
      reviews: 11,
      development: "",
      location: "Active within 2 miles of St James, London",
      image: null,
    },
    {
      name: "AI Portal Ltd",
      rating: 4.8,
      reviews: 0,
      development: "",
      location: "Active within 1 mile of St James, London",
      image: null,
    },
    {
      name: "Aden Architects",
      rating: 5,
      reviews: 0,
      development: "Mclv The Builder Network",
      location: "Active within 1 mile of St James, London",
      image: null,
    },
    {
      name: "Data Ltd",
      rating: 4.8,
      reviews: 12,
      development: "",
      location: "Active within 1 mile of St James, London",
      image: null,
    },
    {
      name: "HE Ltd",
      rating: 5,
      reviews: 13,
      development: "",
      location: "Active within 3 miles of St James, London",
      image: null,
    },
    {
      name: "Reconstruct",
      rating: 5,
      reviews: 0,
      development: "",
      location: "Active within 2 miles of St James, London",
      image: null,
    },
    {
      name: "Smart Craft",
      rating: 5,
      reviews: 0,
      development: "Fawiriguments Builder Network",
      location: "Active within 3 miles of St James, London",
      image: null,
    },
    {
      name: "VK Studio Ltd",
      rating: 5,
      reviews: 0,
      development: "Builder Network",
      location: "Active within 4 miles of St James, London",
      image: null,
    },
    {
      name: "MITCHELL CONSTRUCTION LTD",
      rating: 5,
      reviews: 138,
      development: "",
      location: "Active within 1 mile of St James, London",
      image: null,
    },
    {
      name: "DA Architect",
      rating: 5,
      reviews: 13,
      development: "",
      location: "Active within 2 miles of St James, London",
      image: null,
    },
    {
      name: "TA+ Studio",
      rating: 5,
      reviews: 0,
      development: "",
      location: "Active within 3 miles of St James, London",
      image: null,
    },
    {
      name: "BELIZ CONSTRUCTION LTD",
      rating: 4.8,
      reviews: 12,
      development: "",
      location: "Active within 1 mile of St James, London",
      image: null,
    },
    {
      name: "Krona Design Ltd",
      rating: "5",
      reviews: 17,
      development: "",
      location: "Active within 2 miles of St James, London",
      image: null,
    },
    {
      name: "STUDIO LTD",
      rating: 5,
      reviews: 0,
      development: "",
      location: "Active within 1 mile of St James, London",
      image: null,
    },
  ];

  const [selectedTradespeople, setSelectedTradespeople] = useState([]);

  const toggleInvite = (name) => {
    if (selectedTradespeople.includes(name)) {
      setSelectedTradespeople(selectedTradespeople.filter((t) => t !== name));
    } else if (selectedTradespeople.length < 10) {
      setSelectedTradespeople([...selectedTradespeople, name]);
    } else {
      alert("You can only invite up to 10 tradespeople.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
          Let’s find the best tradespeople near you
        </h1>
        <p className="text-lg text-[#4A4A4A] bg-[#E7F0FA] py-2 px-4 rounded-md mb-6 font-inter inline-block">
          Invite up to 10 tradespeople to give you a quote, the fastest way to start a conversation!
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between mb-8">
          <button className="flex flex-col items-center space-y-2 text-[#000000] font-inter" disabled>
            <Image
              src="/icons/send-invites.svg"
              alt="Send invites icon"
              width={38}
              height={38}
            />
            <span>
              Send invites ({selectedTradespeople.length}/10 tradespeople)
            </span>
          </button>
          <button className="flex flex-col items-center space-y-2 text-[#000000] font-inter" disabled>
            <Image
              src="/icons/get-responses.svg"
              alt="Get responses icon"
              width={38}
              height={38}
            />
            <span>Get responses</span>
          </button>
          <button className="flex flex-col items-center space-y-2 text-[#000000] font-inter" disabled>
            <Image
              src="/icons/start-chats.svg"
              alt="Start chats icon"
              width={38}
              height={38}
            />
            <span>Start chats</span>
          </button>
        </div>

        {/* Recommended Tradespeople */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
          Recommended tradespeople
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {tradespeople.map((person) => (
            <div key={person.name} className="border border-gray-300 rounded-md p-4">
              <div className="flex items-start space-x-4">
                {/* Profile Picture */}
                <div className="relative w-12 h-12">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={`${person.name} profile picture`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 font-kollektif">
                    {person.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Image
                      src="/icons/star.svg"
                      alt="Star icon"
                      width={16}
                      height={16}
                    />
                    <p className="text-[#4A4A4A] font-inter">
                      {person.rating} ({person.reviews} reviews)
                    </p>
                  </div>
                  {person.development && (
                    <p className="text-[#4A4A4A] font-inter">
                      {person.development}
                    </p>
                  )}
                  <p className="text-[#4A4A4A] font-inter">
                    <span>. </span>
                    <span>Active within </span>
                    <span className="font-bold">
                      {person.location.split("Active within ")[1]}
                    </span>
                  </p>
                </div>
              </div>
              <button
                className={`mt-4 w-full px-4 py-2 rounded-md font-inter text-sm ${
                  selectedTradespeople.includes(person.name)
                    ? "bg-[#4A90E2] text-white"
                    : "bg-[#E7F0FA] text-[#000000]"
                }`}
                onClick={() => toggleInvite(person.name)}
              >
                {selectedTradespeople.includes(person.name)
                  ? "Invited"
                  : "Send invite"}
              </button>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mb-8">
          <button
            className="text-[#4A90E2] hover:underline font-inter border border-[#4A90E2] px-4 py-2 rounded-md"
            onClick={() => console.log("Show more tradespeople")}
          >
            Show more
          </button>
        </div>

        {/* Done Sending Invites */}
        <div className="text-left">
          <p className="text-xl text-[#4A4A4A] font-kollektif font-semibold mb-2">
            Done sending invites?
          </p>
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/see-whats-next.svg"
              alt="See what's next icon"
              width={16}
              height={16}
            />
            <a
              href="#"
              className="text-[#4A90E2] hover:underline font-inter"
              onClick={(e) => {
                e.preventDefault();
                console.log("See what's next clicked");
              }}
            >
              See what’s next
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}