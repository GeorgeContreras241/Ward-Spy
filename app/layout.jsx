
"use client"
import { useState, useEffect } from "react";
import { Cinzel, Caudex, Montserrat } from 'next/font/google';
import { Navbar } from "@/app/components/ui/Nanvar";
import { Search } from "@/app/components/ui/Search";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const caudex = Caudex({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caudex',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});



export default function RootLayout({children,}) {

  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
    localStorage.setItem("mode", mode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  return (
    <html lang="es">
      <body
        className={`${cinzel.variable} ${caudex.variable} ${montserrat.variable} font-sans ${mode === "dark" ? "dark" : "light"}`}
      >
        <div className="bg-background">
          <Navbar toggleMode={toggleMode} mode={mode}/>
          <Search />
        </div>
        {children}
      </body>
    </html>
  );
}
