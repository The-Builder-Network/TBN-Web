/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
      "bg-gray-50",
      "text-4xl",
      "text-2xl",
      "p-6",
      "max-w-2xl",
      "bg-blue-500",
      "hover:bg-blue-600",
      "bg-red-500",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };