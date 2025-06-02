"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Header from "../../components/Header";
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState('messages');
  const router = useRouter();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleViewNewLeads = () => {
    router.push('/new-leads');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-6">
            Contacts
          </h1>
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => handleSectionChange('messages')}
              className={`flex items-center space-x-2 font-inter text-base ${
                activeSection === 'messages'
                  ? 'text-[#A1C5FF] underline'
                  : 'text-[#000000]'
              }`}
            >
              <Image
                src="/icons/text.svg"
                alt="Messages Icon"
                width={16}
                height={16}
              />
              <span>Messages</span>
            </button>
            <button
              onClick={() => handleSectionChange('archive')}
              className={`flex items-center space-x-2 font-inter text-base ${
                activeSection === 'archive'
                  ? 'text-[#A1C5FF] underline'
                  : 'text-[#000000]'
              }`}
            >
              <Image
                src="/icons/archive.svg"
                alt="Archive Icon"
                width={16}
                height={16}
              />
              <span>Archive</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src="/icons/empty-folder.svg"
              alt="Empty Folder Icon"
              width={208}
              height={200}
              className="mb-4"
            />
            <h2 className="font-kollektif text-4xl font-semibold text-[#1F2937] mb-2">
              No contact details shared yet
            </h2>
            <p className="font-inter text-1xl text-[#4A4A4A] mb-6">
              When customers want to get in touch with you, their contact details are displayed here.
            </p>
            <button
              onClick={handleViewNewLeads}
              className="bg-[#A1C5FF] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#8EB5FF] transition"
            >
              View new Leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}