import React from "react";
"use client";

import Header from "../../components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailSubmit = (method) => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    // Simulate sending a code (for now, just navigate)
    if (method === "email") {
      router.push(`/login/enter-code?email=${encodeURIComponent(email)}`);
    } else if (method === "sms") {
      router.push(`/login/enter-code?email=${encodeURIComponent(email)}&method=sms`);
    } else if (method === "password") {
      router.push(`/login/password?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
          Login to The Builder Network
        </h1>
        <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
          Enter your email to continue
        </p>

        <div className="border border-gray-300 rounded-md p-6">
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-bold text-gray-900 mb-2 font-kollektif"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          {/* Login Method Buttons */}
          <button
            type="button"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter mb-3 hover:bg-gray-100"
            onClick={() => handleEmailSubmit("email")}
          >
            Get a code via email
          </button>
          <button
            type="button"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter mb-3 hover:bg-gray-100"
            onClick={() => handleEmailSubmit("sms")}
          >
            Get a code via SMS
          </button>
          <button
            type="button"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter hover:bg-gray-100"
            onClick={() => handleEmailSubmit("password")}
          >
            Enter your password
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-[#4A4A4A] font-inter text-center">
          New to The Builder Network?{" "}
          <a href="/signup" className="text-[#4A90E2] hover:underline">
            Sign up as a trades’ person
          </a>
        </p>
      </main>
    </div>
  );
}