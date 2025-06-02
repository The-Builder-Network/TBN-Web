"use client";

import Header from "../../components/Header";

export default function MyJobs() {
  const jobs = [
    {
      category: "server",
      postedDate: "8 Feb 2025",
      description:
        "Suitable local tradespeople have been alerted about your job. As soon as one is interested we will let you know.",
      inviteMore: true,
    },
    {
      category: "series",
      postedDate: "7 Feb 2025",
      description:
        "Suitable local tradespeople have been alerted about your job. As soon as one is interested we will let you know.",
      inviteMore: true,
    },
    {
      category: "Demolition",
      postedDate: "7 Feb 2025",
      description: "",
      interested: 10,
      chats: 0,
      inviteMore: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F5]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-[36px] font-bold text-[#1F2937] mb-6 font-kollektif">
          My jobs
        </h1>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5E7EB] rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#1F2937] font-kollektif">
                  {job.category}
                </h2>
                <span className="text-[#4A4A4A] font-inter text-sm">
                  Posted {job.postedDate}
                </span>
              </div>
              {job.description && (
                <p className="text-[#4A4A4A] font-inter text-base mt-2">
                  {job.description}
                </p>
              )}
              {job.inviteMore && (
                <button className="mt-4 w-full bg-[#E7F0FA] text-[#4A90E2] px-4 py-2 rounded-md font-inter text-base">
                  Send invite to 10 more tradespeople to get more responses
                </button>
              )}
              {job.interested !== undefined && job.chats !== undefined && (
                <div className="flex space-x-4 mt-4">
                  <div className="flex-1 bg-[#F5F6F5] p-3 rounded-md text-center">
                    <p className="text-lg font-semibold text-[#1F2937] font-inter">
                      {job.interested}
                    </p>
                    <p className="text-[#4A4A4A] font-inter text-base">
                      Interested
                    </p>
                    <p className="text-[#4A4A4A] font-inter text-sm">
                      Waiting for your decision
                    </p>
                  </div>
                  <div className="flex-1 bg-[#F5F6F5] p-3 rounded-md text-center">
                    <p className="text-lg font-semibold text-[#1F2937] font-inter">
                      {job.chats}
                    </p>
                    <p className="text-[#4A4A4A] font-inter text-base">
                      Chats
                    </p>
                    <p className="text-[#4A4A4A] font-inter text-sm">
                      Started to discuss job
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F6F5] py-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="flex space-x-4 text-[#4A4A4A] font-inter text-sm mb-4 md:mb-0">
            <a href="#" className="hover:underline">
              Support center
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Cookie policy
            </a>
            <a href="#" className="hover:underline">
              Cookie settings
            </a>
          <a href="#" className="hover:underline">
              Terms and condition
            </a>
          </div>
          <p className="text-[#4A4A4A] font-inter text-sm">
            © 2008-2025 The Builder Network LIMITED
          </p>
        </div>
      </footer>
    </div>
  );
}