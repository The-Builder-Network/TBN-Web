// "use client";

// import Header from "../../components/Header";
// import Image from "next/image";

// export default function Profile() {
//   return (
//     <div className="min-h-screen bg-[#F5F6F5]">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="max-w-5xl mx-auto p-6 flex">
//         {/* Sidebar */}
//         <aside className="w-64 mr-6">
//           {/* Profile Picture Placeholder */}
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold">F</span>
//             </div>
//             <span className="text-[#4A4A4A] font-inter">Frank</span>
//           </div>

//           {/* Sidebar Navigation */}
//           <div className="space-y-4">
//             {/* Account Section */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 font-inter uppercase mb-2">
//                 Account
//               </h3>
//               <button className="flex items-center space-x-3 text-[#4A90E2] font-inter w-full">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 <span>Contact information</span>
//               </button>
//               <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter mt-2">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 <span>Manage account</span>
//               </button>
//               <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter mt-2">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span>My questions</span>
//               </button>
//             </div>

//             {/* Settings Section */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 font-inter uppercase mb-2">
//                 Settings
//               </h3>
//               <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                   />
//                 </svg>
//                 <span>Notifications</span>
//               </button>
//             </div>

//             {/* Support Section */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 font-inter uppercase mb-2">
//                 Support
//               </h3>
//               <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
//                   />
//                 </svg>
//                 <span>Support center</span>
//               </button>
//               <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter mt-2">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//                 <span>Contact us</span>
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <section className="flex-1">
//           <h1 className="text-4xl font-bold text-gray-900 mb-6 font-kollektif">
//             Profile
//           </h1>

//           {/* Contact Details Section */}
//           <div className="bg-white border border-gray-300 rounded-md p-6">
//             <h2 className="text-xl font-semibold text-gray-900 font-kollektif mb-4">
//               Contact details
//             </h2>
//             <div className="flex items-center space-x-4">
//               <svg
//                 className="w-6 h-6 text-[#4A90E2]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 11c0-1.104-.896-2-2-2H6c-1.104 0-2 .896-2 2v6c0 1.104.896 2 2 2h4c1.104 0 2-.896 2-2v-1m0-5v-1m4 0h4c1.104 0 2 .896 2 2v6c0 1.104-.896 2-2 2h-4c-1.104 0 0-2-2-2v-1m0-5v-1m-8-4V5c0-1.104.896-2 2-2h4c1.104 0 2 .896 2 2v2"
//                 />
//               </svg>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 font-inter">
//                   Verify account to access
//                 </h3>
//                 <p className="text-[#4A4A4A] font-inter">
//                   To access your information, please authenticate your account.
//                 </p>
//               </div>
//             </div>
//             <button className="mt-4 bg-[#E7F0FA] text-[#4A90E2] px-4 py-2 rounded-md font-inter">
//               Verify account
//             </button>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-[#F5F6F5] py-6">
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
//           <div className="flex space-x-4 text-[#4A4A4A] font-inter text-sm mb-4 md:mb-0">
//             <a href="#" className="hover:underline">
//               Support center
//             </a>
//             <a href="#" className="hover:underline">
//               Privacy
//             </a>
//             <a href="#" className="hover:underline">
//               Cookie policy
//             </a>
//             <a href="#" className="hover:underline">
//               Cookie settings
//             </a>
//             <a href="#" className="hover:underline">
//               Terms and condition
//             </a>
//           </div>
//           <p className="text-[#4A4A4A] font-inter text-sm">
//             © 2008-2025 The Builder Network LIMITED
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }


"use client";

import Header from "../../components/Header";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F5F6F5]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6 flex">
        {/* Sidebar */}
        <aside className="w-64 mr-6">
          {/* Profile Picture and Name */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-[#E5E5E5] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-[#4A4A4A] font-inter text-base">Frank</span>
          </div>

          {/* Sidebar Navigation */}
          <div className="space-y-6">
            {/* Account Section */}
            <div>
              <h3 className="text-xs font-bold text-[#6B7280] font-inter uppercase mb-3">
                Account
              </h3>
              <button className="flex items-center space-x-3 text-[#4A90E2] font-inter text-base relative">
                <svg
                  className="w-5 h-5 text-[#4A90E2]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Contact information</span>
                <div className="absolute left-[-24px] top-0 h-6 w-[2px] bg-[#4A90E2]"></div>
              </button>
              <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter text-base mt-3">
                <svg
                  className="w-5 h-5 text-[#4A4A4A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Manage account</span>
              </button>
              <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter text-base mt-3">
                <svg
                  className="w-5 h-5 text-[#4A4A4A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>My questions</span>
              </button>
            </div>

            {/* Settings Section */}
            <div>
              <h3 className="text-xs font-bold text-[#6B7280] font-inter uppercase mb-3">
                Settings
              </h3>
              <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter text-base">
                <svg
                  className="w-5 h-5 text-[#4A4A4A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span>Notifications</span>
              </button>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-xs font-bold text-[#6B7280] font-inter uppercase mb-3">
                Support
              </h3>
              <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter text-base">
                <svg
                  className="w-5 h-5 text-[#4A4A4A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>Support center</span>
              </button>
              <button className="flex items-center space-x-3 text-[#4A4A4A] font-inter text-base mt-3">
                <svg
                  className="w-5 h-5 text-[#4A4A4A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>Contact us</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          <h1 className="text-[36px] font-bold text-[#1F2937] mb-6 font-kollektif">
            Profile
          </h1>

          {/* Contact Details Section */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#1F2937] font-kollektif mb-4">
              Contact details
            </h2>
            <div className="flex items-center space-x-4">
              <svg
                className="w-6 h-6 text-[#4A90E2]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0-1.104-.896-2-2-2H6c-1.104 0-2 .896-2 2v6c0 1.104.896 2 2 2h4c1.104 0 2-.896 2-2v-1m0-5v-1m4 0h4c1.104 0 2 .896 2 2v6c0 1.104-.896 2-2 2h-4c-1.104 0 0-2-2-2v-1m0-5v-1m-8-4V5c0-1.104.896-2 2-2h4c1.104 0 2 .896 2 2v2"
                />
              </svg>
              <div>
                <h3 className="text-base font-bold text-[#1F2937] font-inter">
                  Verify account to access
                </h3>
                <p className="text-base text-[#4A4A4A] font-inter mt-1">
                  To access your information, please authenticate your account.
                </p>
              </div>
            </div>
            <button className="mt-4 bg-[#E7F0FA] text-[#4A90E2] px-4 py-2 rounded-md font-inter text-base">
              Verify account
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F6F5] py-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
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