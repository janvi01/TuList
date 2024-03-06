"use client";
import Navbar from "./components/Navbar";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TuList ✨</title>
        <meta
          name="description"
          content="A Youtube Playlist Manager to keep all your YouTube playlists at one place. Get started now."
          key="desc"
        />
      </head>
      <body className="bg-gradient-to-r from-slate-900 to-stone-800">
        <AuthContextProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
