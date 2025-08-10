import React from "react";
"use client"; // Add this directive to mark the component as a client component

import Header from "../../components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostAJob() {
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      // Convert category to a URL-friendly slug (e.g., "Architectural Services" -> "architectural-services")
      const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
      router.push(`/post-a-job/${categorySlug}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
          Post a job
        </h1>
        <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
          Get responses from The Builder Network’s screened and reviewed
          tradespeople near you.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
          What would you like to have done?
        </h2>

        {/* Form with Dropdown */}
        <form onSubmit={handleSubmit}>
          <select
            className="w-full p-3 border border-gray-300 rounded-md text-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] font-inter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="carpentry">Carpentry</option>
            <option value="architectural-services">Architectural Services</option>
          </select>

          {/* Next Button */}
          <button
            type="submit"
            className="bg-[#4A90E2] text-white px-6 py-3 rounded-md hover:bg-[#357ABD]"
          >
            Next
          </button>
        </form>
      </main>
    </div>
  );
}