import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SWT - Smart Water Tank Monitoring System",
  description: "Real-time monitoring, intelligent alerts, and comprehensive analytics for optimal water management.",
  generator: "Next.js",
  applicationName: "SWT - Smart Water Tank Monitoring System",
  keywords: [
    "smart water tank",
    "water management",
    "real-time monitoring",
    "intelligent alerts",
    "water analytics",
    "water level monitoring",
    "water quality monitoring",
    "water usage tracking",
    "water conservation",
    "IoT water tank",
    "water tank automation",
    "water tank sensors",
    "water tank management",
    "water tank control system",
    "water tank monitoring system",
    "water tank data analytics",
    "water tank efficiency",
    "water tank optimization",
    "water tank health monitoring",
    "water tank remote monitoring",
    "water tank alerts",
    "water tank notifications",
    "water tank insights",
    "water tank performance",
    "water tank technology",
    "water tank solutions",
    "water tank innovation",
    "water tank sustainability",
    "water tank smart technology",
    "water tank smart solutions",
    "water tank smart monitoring",
    "water tank smart alerts",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="p-4 bg-blue-700 text-white text-center">
          <h1>Smart Water Tank Monitoring System</h1>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p>&copy; 2025 Smart Water Tank. All rights reserved.</p>
          <p>Frontend Developer: Masengesho Emmy | Backend Developer: Ndayizeye Amos</p>
        </footer>
      </body>
    </html>
  );
}
