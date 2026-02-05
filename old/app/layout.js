
import "../app/globals.css";
import { Inter, Poppins } from "next/font/google";

// Load Poppins as a temporary fallback for Kollektif
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kollektif",
});

// Load Inter with weight 400 (regular)
const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${poppins.variable} ${inter.variable} bg-[#F5F6F5]`}>
        {children}
      </body>
    </html>
  );
}