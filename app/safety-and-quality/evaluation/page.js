"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";

export default function Evaluation() {
  const [firstName, setFirstName] = useState("");
  const [skillset, setSkillset] = useState("");
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
      setSkillset(formData.skillset || "");
      setAnswer(formData.evaluationAnswer || "");
    }
  }, []);

  const handleBack = () => {
    router.push("/safety-and-quality/evaluation-start");
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Please provide an answer before submitting.");
      return;
    }
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        evaluationAnswer: answer,
      })
    );
    router.push("/safety-and-quality/evaluation-complete");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  const formatSkillset = (skill) => {
    if (!skill) return "Skillset";
    return skill
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getQuestionAndEntities = (skill) => {
    switch (skill) {
      case "architecture":
        return {
          question: "Please write down the name of the legal entity you are registered with, along with your registration number (if ARB). We currently accept the following:",
          entities: "Architects Registration Board, Chartered Institute of Architectural Technologists, Royal Institute of British Architects",
        };
      case "cad-drawings":
        return {
          question: "Please provide details of your experience with CAD software, including the name of a project you’ve completed and the software used (e.g., AutoCAD, Revit). We expect proficiency in the following tools:",
          entities: "AutoCAD, Revit, SketchUp, SolidWorks",
        };
      case "carpentry":
        return {
          question: "Please provide details of your carpentry certification or apprenticeship, including the issuing organization and your certification number. We currently accept certifications from:",
          entities: "City & Guilds, National Vocational Qualification (NVQ), Carpentry Apprenticeship Programs",
        };
      case "electrical-work":
        return {
          question: "Please provide your electrical certification details, including the issuing body and your license number. We currently accept certifications from:",
          entities: "National Inspection Council for Electrical Installation Contracting (NICEIC), Electrical Contractors’ Association (ECA), Joint Industry Board (JIB)",
        };
      case "plumbing":
        return {
          question: "Please provide your plumbing certification details, including the issuing organization and your registration number. We currently accept certifications from:",
          entities: "Chartered Institute of Plumbing and Heating Engineering (CIPHE), City & Guilds, National Vocational Qualification (NVQ)",
        };
      default:
        return {
          question: "Please provide details of your experience or certification in your selected skillset.",
          entities: "Please specify any relevant certifications or qualifications.",
        };
    }
  };

  const { question, entities } = getQuestionAndEntities(skillset);

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
          <button
            onClick={handleBack}
            className="text-[#4A4A4A] font-inter text-sm flex items-center mb-2"
          >
            <span className="mr-1">←</span> Back
          </button>
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            Safety & Quality
          </h1>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[60%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 3/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        <div className=" rounded-md p-4 w-full max-w-lg">
          <h2 className="font-kollektif text-[35px] font-bold text-[#1F2937] mb-6">
            {formatSkillset(skillset)}
          </h2>
          <p className="font-inter font-semibold text-[18px] text-sm text-[#4A4A4A] mb-6">
            Question 1 of 1
          </p>
          <p className="font-inter font-semibold text-[15px] text-sm text-[#4A4A4A] mb-6">
            {question}
          </p>
          <p className="font-inter font-semibold text-[15px] text-sm text-[#4A4A4A] mb-6">
            {entities}
          </p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-36 border border-gray-300 rounded-md p-2 font-inter text-base text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            placeholder="Enter your answer here..."
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition mt-6"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}