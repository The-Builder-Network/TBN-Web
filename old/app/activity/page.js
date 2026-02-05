
"use client";
import React from 'react';
import Image from 'next/image';
import Header from "../../components/Header";

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow p-8 flex gap-12">
        {/* Left Sidebar */}
        <div className="w-[300px]  rounded-md border border-gray-200 pl-15">
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] px-4 pt-5 mb-4">
            Activity
          </h1>
          <div className="space-y-4">
            <div className="bg-[#A1C5FF] px-4 py-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {/* Icon for "Shortlisted" */}
                <Image
                  src="/icons/message.svg"
                  alt="Shortlisted Icon"
                  width={30}
                  height={30}
                />
                <div>
                  <p className="font-kollektif font-semibold text-sm text-[#1F2937]">Shortlisted</p>
                  <p className="font-inter text-sm text-[#4A4A4A]">You haven’t received any contact details</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {/* Icon for "Hired" */}
                <Image
                  src="/icons/handshake.svg"
                  alt="Hired Icon"
                  width={30}
                  height={30}
                />
                <div>
                  <p className="font-kollektif font-semibold text-sm text-[#1F2937]">Hired</p>
                  <p className="font-inter text-sm text-[#4A4A4A]">You haven’t been hired for any jobs</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {/* Icon for "Interested" */}
                <Image
                  src="/icons/clock.svg"
                  alt="Interested Icon"
                  width={30}
                  height={30}
                />
                <div>
                  <p className="font-kollektif font-semibold text-sm text-[#1F2937]">Interested</p>
                  <p className="font-inter text-sm text-[#4A4A4A]">No active leads that you expressed interest in</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-5">
              <div className="flex items-center gap-2">
                {/* Icon for "Closed" */}
                <Image
                  src="/icons/closed.svg"
                  alt="Closed Icon"
                  width={30}
                  height={30}
                />
                <div>
                  <p className="font-kollektif font-semibold text-sm text-[#1F2937]">Closed</p>
                  <p className="font-inter text-sm text-[#4A4A4A]">You have no inactive leads at the moment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Folder Icon */}
          <Image
            src="/icons/empty-folder.svg"
            alt="Empty Folder Icon"
            width={208}
            height={200}
            className="mb-4"
          />
          <h2 className="font-kollektif text-4xl font-semibold text-[#1F2937] mb-2">No leads here for now</h2>
          <p className="font-inter text-[#4A4A4A] text-1xl">
            You don’t have any leads in this category at the moment.
          </p>
        </div>
      </div>
    </div>
  );
}