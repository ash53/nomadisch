"use client";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TravelTable from "../components/TravelTable";
import AISummary from "../components/AISummary";

export default function Home() {
  const [options, setOptions] = useState<any[]>([]);
  const [summary, setSummary] = useState("");

  const handleSearch = async (query: string) => {
    // Mocked for now
    const data = {
      options: [
        { mode: "Bus", origin: "Frankfurt", destination: "Paris", date: "2025-08-10", duration: "8h", price: 35 },
        { mode: "Flight", origin: "Cologne", destination: "Paris", date: "2025-08-10", duration: "3h", price: 95 },
        { mode: "Flight", origin: "Frankfurt", destination: "Paris", date: "2025-08-10", duration: "1h 10m", price: 160 }
      ],
      summary: "The cheapest option is FlixBus (€35, 8h). A Cologne flight is €95 but adds 2h travel. Frankfurt flight is fastest (€160)."
    };
    setOptions(data.options);
    setSummary(data.summary);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Nomadisch</h1>
      <SearchBar onSearch={handleSearch} />
      {options.length > 0 && <TravelTable options={options} />}
      {summary && <AISummary text={summary} />}
    </div>
  );
}
