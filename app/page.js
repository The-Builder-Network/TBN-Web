import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reusable Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6 text-center">
        <h1
          className="text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Kollektif', sans-serif" }}
        >
          Welcome to The Builder Network
        </h1>
        <p
          className="text-lg text-gray-700 mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Find skilled tradespeople for your projects.
        </p>

        {/* Button to Navigate to Post a Job */}
        <Link href="/post-a-job">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
            Post a Job
          </button>
        </Link>
      </main>
    </div>
  );
}