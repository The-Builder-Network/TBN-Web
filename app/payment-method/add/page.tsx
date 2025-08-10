import React from "react";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";

export default function AddPaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      if (formData.paymentMethod) setPaymentMethod(formData.paymentMethod);
    }
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleBack = () => {
    router.push("/payment-method");
  };

  const handleSaveAndContinue = () => {
    if (!paymentMethod) {
      setShowModal(true);
      return;
    }
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        paymentMethod,
      })
    );
    router.push("/new-leads");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  const closeModal = () => {
    setShowModal(false);
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
            Payment Method
          </h1>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[100%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 5/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            Add your payment method
          </h2>
          <p className="font-inter font-semibold text-[15px] text-sm text-[#4A4A4A] mb-6">
            You wont be charged in this step. You only pay when a customer shares their contact details.
          </p>
          <h3 className="font-kollektif text-[20px] font-bold text-[#1F2937] mb-6">
            Choose payment method
          </h3>
          <div className="flex flex-col space-y-4">
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                paymentMethod === "credit-debit-card"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="credit-debit-card"
                checked={paymentMethod === "credit-debit-card"}
                onChange={() => handlePaymentMethodChange("credit-debit-card")}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                💳 Credit/Debit Card
              </span>
              <span className="ml-2 font-inter text-sm text-[#4A4A4A]">
                (Visa, Mastercard, Amex)
              </span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                paymentMethod === "bank-account"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="bank-account"
                checked={paymentMethod === "bank-account"}
                onChange={() => handlePaymentMethodChange("bank-account")}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                🏦 Bank Account (ACH Transfer)
              </span>
              <span className="ml-2 font-inter text-sm text-[#4A4A4A]">
                (Direct bank transfer)
              </span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
                paymentMethod === "paypal"
                  ? "border-[#4A90E2] bg-[#E8F0FE]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => handlePaymentMethodChange("paypal")}
                className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
              />
              <span className="ml-2 font-inter text-base text-[#4A4A4A]">
                💰 PayPal
              </span>
              <span className="ml-2 font-inter text-sm text-[#4A4A4A]">
                (Secure online payment)
              </span>
            </label>
          </div>
          <div className="flex space-x-4 mt-6">
          <button
              onClick={handleBack}
              className="w-1/2 border border-[#4A90E2] text-[#4A90E2] px-4 py-2 rounded-md font-inter text-sm hover:bg-[#E5F0FA] transition"
            >
              Back
            </button>
            <button
              onClick={handleSaveAndContinue}
              className="w-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition"
            >
              Save and Continue
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-[#4A4A4A] font-inter text-sm"
            >
              ✕
            </button>
            <h3 className="font-kollektif text-[20px] font-bold text-[#1F2937] mb-4">
              Complete your registration
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[#34C759] text-base">✔</span>
              <p className="font-inter text-sm text-[#4A4A4A]">
                1. Work details
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[#34C759] text-base">✔</span>
              <p className="font-inter text-sm text-[#4A4A4A]">
                2. ID Check
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[#34C759] text-base">✔</span>
              <p className="font-inter text-sm text-[#4A4A4A]">
                3. Safety & Quality
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[#34C759] text-base">✔</span>
              <p className="font-inter text-sm text-[#4A4A4A]">
                4. Profile Setup
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-400 text-base">○</span>
              <p className="font-inter text-sm text-[#4A4A4A]">
                5. Payment method
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}