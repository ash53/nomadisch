"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Calendar, Users, Plane, Train, Bus } from "lucide-react";

import SearchBar from "@/components/SearchBar";
import ChatPage from "@/components/ChatPage";

export default function Home() {
  const [options, setOptions] = useState<any[]>([]);

  const handleSearch = () => {
    setOptions([
      {
        type: "Best Deal",
        mode: "✈️ Flight",
        origin: "Frankfurt",
        destination: "Paris",
        alt: false,
        date: "2025-08-10",
        duration: "1h 10m",
        price: 160,
      },
      {
        type: "Smart Alternative",
        mode: "🚌 + ✈️ Bus + Flight",
        origin: "Cologne",
        destination: "Paris Orly",
        alt: true,
        date: "2025-08-10",
        duration: "3h 20m",
        price: 95,
      },
      {
        type: "Cheapest",
        mode: "🚆 Train",
        origin: "Frankfurt",
        destination: "Paris",
        alt: false,
        date: "2025-08-10",
        duration: "3h 50m",
        price: 80,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 shadow fixed top-0 w-full z-50 flex items-center h-20 px-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Nomadisch Logo"
              width={250} // Bigger logo
              height={300} // Adjusted height to keep header slim
              priority
              className="object-contain"
            />
          </a>
        </div>
      </header>
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center pt-40 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6 text-center">
          Plan your trip - cheaper, faster, smarter.
        </h2>
        {/* <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
          Compare flights, trains, and buses — including nearby airports and
          stations — to get the best combination of price and time.
        </p> */}

        {/* SEARCH BAR */}
        {/* <SearchBar /> */}
        <ChatPage />
      </section>

      {/* RESULTS */}
      {options.length > 0 && (
        <section className="max-w-6xl mx-auto p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Smart Results for Your Trip
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {options.map((o, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:scale-105 ${
                  o.alt ? "border-2 border-pink-400" : ""
                }`}
              >
                {o.alt && (
                  <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                    Smart Alternative
                  </span>
                )}
                <div className="text-2xl mt-2 mb-2">{o.mode}</div>
                <div className="text-gray-700 font-medium mb-1">
                  {o.origin} → {o.destination}
                </div>
                <div className="text-gray-500 text-sm mb-3">
                  {o.date} • {o.duration}
                </div>
                <div className="text-3xl font-bold text-pink-600">
                  €{o.price}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
