"use client";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-slate-900 to-stone-800">
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
