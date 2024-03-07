"use client";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TuList 🚀</title>
        <meta
          name="description"
          content="A Youtube Playlist Manager to keep all your YouTube playlists at one place. Get started now."
          key="desc"
        />
        <meta property="og:description" content="A Youtube Playlist Manager." />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content="https://tulist-web.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TuList 🚀" />
        <meta
          name="twitter:description"
          content="A Youtube Playlist Manager to keep all your YouTube playlists at one place. Get started now."
        />
        <meta
          name="twitter:image"
          content="https://tulist-web.vercel.app/preview.png"
        />
        <meta name="twitter:site" content="@janvibajo01" />
      </head>
      <body className="bg-gradient-to-r from-slate-900 to-stone-800">
        <AuthContextProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
