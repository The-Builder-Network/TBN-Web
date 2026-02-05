// "use client"; // Add this directive to mark the component as a client component

// import Header from "../../../components/Header";
// import { useState } from "react";
// import { useParams } from "next/navigation"; // Use useParams to get dynamic params in a client component

// // Utility function to convert slug to title case
// const slugToTitle = (slug) => {
//   return slug
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export default function PostJobCategory() {
//   const params = useParams(); // Use useParams hook to get the dynamic category
//   const { category } = params; // Extract category from params
//   const categoryTitle = slugToTitle(category); // Convert slug to title case (e.g., "architectural-services" to "Architectural Services")

//   const [serviceType, setServiceType] = useState("");
//   const [projectType, setProjectType] = useState("");
//   const [description, setDescription] = useState("");
//   const [addPhotos, setAddPhotos] = useState("");
//   const [postcode, setPostcode] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For now, log the form data; later, this will redirect to a login page or submit the job
//     console.log({
//       category: categoryTitle,
//       serviceType,
//       projectType,
//       description,
//       addPhotos,
//       postcode,
//     });
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="max-w-2xl mx-auto p-6">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
//           Post an {categoryTitle} job
//         </h1>
//         <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
//           Get responses from The Builder Network’s screened and reviewed
//           tradespeople near you.
//         </p>

//         <form onSubmit={handleSubmit}>
//           {/* What type of service do you need? */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
//               What type of service do you need?
//             </h2>
//             <div className="space-y-2">
//               {[
//                 "Basic site plans or quotes",
//                 "Planning and planning application",
//                 "Site plans for builders to build from",
//                 "Structural calculations",
//                 "Not sure",
//               ].map((option) => (
//                 <label
//                   key={option}
//                   className={`block p-3 border rounded-md cursor-pointer ${
//                     serviceType === option
//                       ? "bg-[#E7F0FA] border-[#4A90E2]"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="serviceType"
//                     value={option}
//                     checked={serviceType === option}
//                     onChange={(e) => setServiceType(e.target.value)}
//                     className="mr-2"
//                   />
//                   <span className="text-gray-900 font-inter">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* What type of project are you planning? */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
//               What type of project are you planning?
//             </h2>
//             <div className="space-y-2">
//               {["Extension", "Loft conversion", "Renovation", "New build", "Other"].map(
//                 (option) => (
//                   <label
//                     key={option}
//                     className={`block p-3 border rounded-md cursor-pointer ${
//                       projectType === option
//                         ? "bg-[#E7F0FA] border-[#4A90E2]"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="projectType"
//                       value={option}
//                       checked={projectType === option}
//                       onChange={(e) => setProjectType(e.target.value)}
//                       className="mr-2"
//                     />
//                     <span className="text-gray-900 font-inter">{option}</span>
//                   </label>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Add a description to your job */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
//               Add a description to your job
//             </h2>
//             <p className="text-[#4A4A4A] mb-2 font-inter">
//               Lorem ipsum has been the industry’s standard type since the 1500s,
//               when an unknown printer took a galley.
//             </p>
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
//               rows="4"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Loft has empty dormer that isn’t the standard type..."
//             />
//           </div>

//           {/* Would you like to add photos to Blueprint? */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
//               Would you like to add photos to Blueprint? (Optional)
//             </h2>
//             <div className="space-y-2">
//               {["Yes", "No, maybe later"].map((option) => (
//                 <label
//                   key={option}
//                   className={`block p-3 border rounded-md cursor-pointer ${
//                     addPhotos === option
//                       ? "bg-[#E7F0FA] border-[#4A90E2]"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="addPhotos"
//                     value={option}
//                     checked={addPhotos === option}
//                     onChange={(e) => setAddPhotos(e.target.value)}
//                     className="mr-2"
//                   />
//                   <span className="text-gray-900 font-inter">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Postcode for the job */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
//               Postcode for the job
//             </h2>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
//               value={postcode}
//               onChange={(e) => setPostcode(e.target.value)}
//               placeholder="SW1A 0AA - St. James, London"
//             />
//           </div>

//           {/* Submit Section */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
//               Get responses from tradespeople near you
//             </h2>
//             <p className="text-[#4A4A4A] mb-4 font-inter">
//               We will only share your contact to tradespeople you choose to talk to.
//             </p>

//             <div className="border border-gray-300 rounded-md p-4 mb-4">
//               <h3 className="text-lg font-bold text-gray-900 mb-2 font-kollektif">
//                 Log in
//               </h3>
//               <p className="text-[#4A4A4A] mb-4 font-inter">
//                 To continue, please choose how to log in.
//               </p>
//               <button
//                 type="button"
//                 className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter mb-2 hover:bg-gray-100"
//                 onClick={() => console.log("Create account clicked")}
//               >
//                 I’m new, create an account
//               </button>
//               <button
//                 type="button"
//                 className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter hover:bg-gray-100"
//                 onClick={() => console.log("Log in clicked")}
//               >
//                 I have an account
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-[#4A90E2] text-white px-6 py-3 rounded-md hover:bg-[#357ABD]"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }


"use client";

import Header from "../../../components/Header";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Utility function to convert slug to title case
const slugToTitle = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function PostJobCategory() {
  const params = useParams();
  const { category } = params;
  const categoryTitle = slugToTitle(category);

  const [serviceType, setServiceType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [addPhotos, setAddPhotos] = useState("");
  const [postcode, setPostcode] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data
    console.log({
      category: categoryTitle,
      serviceType,
      projectType,
      description,
      addPhotos,
      postcode,
    });
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-kollektif">
          Post an {categoryTitle} job
        </h1>
        <p className="text-lg text-[#4A4A4A] mb-6 font-inter">
          Get responses from The Builder Network’s screened and reviewed
          tradespeople near you.
        </p>

        <form onSubmit={handleSubmit}>
          {/* What type of service do you need? */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
              What type of service do you need?
            </h2>
            <div className="space-y-2">
              {[
                "Basic site plans or quotes",
                "Planning and planning application",
                "Site plans for builders to build from",
                "Structural calculations",
                "Not sure",
              ].map((option) => (
                <label
                  key={option}
                  className={`block p-3 border rounded-md cursor-pointer ${
                    serviceType === option
                      ? "bg-[#E7F0FA] border-[#4A90E2]"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="serviceType"
                    value={option}
                    checked={serviceType === option}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-900 font-inter">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* What type of project are you planning? */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
              What type of project are you planning?
            </h2>
            <div className="space-y-2">
              {["Extension", "Loft conversion", "Renovation", "New build", "Other"].map(
                (option) => (
                  <label
                    key={option}
                    className={`block p-3 border rounded-md cursor-pointer ${
                      projectType === option
                        ? "bg-[#E7F0FA] border-[#4A90E2]"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={option}
                      checked={projectType === option}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-900 font-inter">{option}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Add a description to your job */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
              Add a description to your job
            </h2>
            <p className="text-[#4A4A4A] mb-2 font-inter">
              Lorem ipsum has been the industry’s standard type since the 1500s,
              when an unknown printer took a galley.
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Loft has empty dormer that isn’t the standard type..."
            />
          </div>

          {/* Would you like to add photos to Blueprint? */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
              Would you like to add photos to Blueprint? (Optional)
            </h2>
            <div className="space-y-2">
              {["Yes", "No, maybe later"].map((option) => (
                <label
                  key={option}
                  className={`block p-3 border rounded-md cursor-pointer ${
                    addPhotos === option
                      ? "bg-[#E7F0FA] border-[#4A90E2]"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="addPhotos"
                    value={option}
                    checked={addPhotos === option}
                    onChange={(e) => setAddPhotos(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-900 font-inter">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Postcode for the job */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
              Postcode for the job
            </h2>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="SW1A 0AA - St. James, London"
            />
          </div>

          {/* Submit Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-kollektif">
              Get responses from tradespeople near you
            </h2>
            <p className="text-[#4A4A4A] mb-4 font-inter">
              We will only share your contact to tradespeople you choose to talk to.
            </p>

            <div className="border border-gray-300 rounded-md p-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-kollektif">
                Log in
              </h3>
              <p className="text-[#4A4A4A] mb-4 font-inter">
                To continue, please choose how to log in.
              </p>
              <button
                type="button"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter mb-2 hover:bg-gray-100"
                onClick={() => router.push("/signup")}
              >
                I’m new, create an account
              </button>
              <button
                type="button"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-inter hover:bg-gray-100"
                onClick={() => router.push("/login")}
              >
                I have an account
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#4A90E2] text-white px-6 py-3 rounded-md hover:bg-[#357ABD]"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}