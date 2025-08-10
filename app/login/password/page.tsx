import React from "react";
// "use client";

// import Header from "../../../components/Header";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function EnterPassword() {
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!password) {
//       alert("Please enter your password.");
//       return;
//     }
//     console.log({ email, password });
//     router.push("/dashboard");
//   };

//   return (
//     <div className="min-h-screen">
//       <Header />
//       <main className="max-w-2xl mx-auto p-6">
//         <a
//           href="/login"
//           className="text-[#4A90E2] hover:underline font-inter mb-4 inline-block"
//         >
//           ← Back
//         </a>
//         <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
//           Enter your password
//         </h1>
//         <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
//           Enter your password to log in to The Builder Network.
//         </p>
//         <div className="border border-gray-300 rounded-md p-6">
//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block text-lg font-bold text-gray-900 mb-2 font-kollektif"
//             >
//               Password <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#4A90E2] text-white p-3 rounded-md hover:bg-[#357ABD]"
//             onClick={handleSubmit}
//           >
//             Log in
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import Header from "../../../components/Header";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PasswordContent() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      alert("Please enter your password.");
      return;
    }
    console.log({ email, password });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto p-6">
        <a
          href="/login"
          className="text-[#4A90E2] hover:underline font-inter mb-4 inline-block"
        >
          ← Back
        </a>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
          Enter your password
        </h1>
        <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
          Enter your password to log in to The Builder Network.
        </p>
        <div className="border border-gray-300 rounded-md p-6">
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-bold text-gray-900 mb-2 font-kollektif"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4A90E2] text-white p-3 rounded-md hover:bg-[#357ABD]"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
      </main>
    </div>
  );
}

export default function EnterPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordContent />
    </Suspense>
  );
}