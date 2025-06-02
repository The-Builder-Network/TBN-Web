// "use client";

// import Header from "../../../components/Header";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function EnterCode() {
//   const [code, setCode] = useState(["", "", "", ""]); // Array to store 4 digits
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");

//   const handleCodeChange = (index, value) => {
//     if (/^\d?$/.test(value)) { // Allow only single digits
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);

//       // Auto-focus next input
//       if (value && index < 3) {
//         document.getElementById(`code-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const fullCode = code.join("");
//     if (fullCode.length === 4) {
//       // Simulate code verification (for now, just log and redirect)
//       console.log({ email, code: fullCode });
//       router.push("/dashboard"); // Redirect to a dashboard (placeholder)
//     } else {
//       alert("Please enter a 4-digit code.");
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="max-w-2xl mx-auto p-6">
//         <a
//           href="/login"
//           className="text-[#4A90E2] hover:underline font-inter mb-4 inline-block"
//         >
//           &larr; Back
//         </a>

//         <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
//           Enter the code
//         </h1>
//         <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
//           If there’s an account linked to your email address, you will receive a code via email. Enter the code below
//         </p>

//         <div className="border border-gray-300 rounded-md p-6">
//           {/* Code Input Fields */}
//           <div className="mb-6">
//             <label className="block text-lg font-bold text-gray-900 mb-2 font-kollektif">
//               Enter the code <span className="text-red-500">*</span>
//             </label>
//             <div className="flex space-x-4 justify-center">
//               {code.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`code-${index}`}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleCodeChange(index, e.target.value)}
//                   className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
//                   required
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Resend Code Link */}
//           <div className="text-center">
//             <a
//               href="#"
//               className="text-[#4A90E2] hover:underline font-inter"
//               onClick={(e) => {
//                 e.preventDefault();
//                 console.log("Resend code requested for:", email);
//               }}
//             >
//               Resend code
//             </a>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import Header from "../../../components/Header";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EnterCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleCodeChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      console.log({ email, code: fullCode });
      router.push("/dashboard");
    } else {
      alert("Please enter a 4-digit code.");
    }
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
          Enter the code
        </h1>
        <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
          If there’s an account linked to your email address, you will receive a code via email. Enter the code below
        </p>
        <div className="border border-gray-300 rounded-md p-6">
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-900 mb-2 font-kollektif">
              Enter the code <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                  required
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <a
              href="#"
              className="text-[#4A90E2] hover:underline font-inter"
              onClick={(e) => {
                e.preventDefault();
                console.log("Resend code requested for:", email);
              }}
            >
              Resend code
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}