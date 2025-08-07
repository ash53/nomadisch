"use client";
import { useState } from "react";
import { Search, Users, ArrowLeftRight } from "lucide-react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

type PassengerType = "adults" | "children" | "infants";

export default function SearchBar() {
  const [tripType, setTripType] = useState<"return" | "oneway" | "multistop">(
    "return"
  );
  const [luggage, setLuggage] = useState(0);
  const [fromInput, setFromInput] = useState("From");
  const [toInput, setToInput] = useState("To");
  const [departureDate, setDepartureDate] = useState("Departure");
  const [returnDate, setReturnDate] = useState("Return");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [passengers, setPassengers] = useState<{
    adults: number;
    children: number;
    infants: number;
  }>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  // Swap From & To
  const swapLocations = () => {
    setFromInput(toInput);
    setToInput(fromInput);
  };

  return (
    <div className="p-6">
      {/* Top controls */}
      <div className="flex justify-start gap-8 text-gray-700 text-sm mb-3">
        <select
          value={tripType}
          onChange={(e) =>
            setTripType(e.target.value as "return" | "oneway" | "multistop")
          }
          className="bg-transparent font-medium focus:outline-none"
        >
          <option value="return">Return</option>
          <option value="oneway">One Way</option>
          <option value="multicity">Multi-Stop</option>
        </select>
      </div>

      {/* Search bar */}
      <div className="flex items-center bg-white rounded-full overflow-hidden shadow-xl shadow-gray-200">
        {/* From */}
        <div className="flex items-center flex-1 px-4 py-3">
          <input
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            placeholder="From"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Swap */}
        <button
          className="px-2 text-gray-500 hover:bg-gray-100 transition"
          onClick={swapLocations}
        >
          <ArrowLeftRight />
        </button>

        {/* To */}
        <div className="flex items-center flex-1 px-4 py-3 border-l">
          <input
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            placeholder="To"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Dates */}
        <div
          className="flex items-center px-4 py-3 border-l min-w-[220px] cursor-pointer hover:bg-gray-50 transition"
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar className="text-gray-400 mr-2" />
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date | null, Date | null]) =>
              setDateRange(update)
            }
            placeholderText="Departure – Return"
            className="outline-none text-sm text-gray-700 w-full bg-transparent cursor-pointer"
            dateFormat="dd MMM yyyy"
            monthsShown={2}
            calendarClassName="rounded-lg shadow-lg p-2"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Passengers */}
        <div className="flex items-center px-4 py-3 border-l min-w-[180px]">
          <Users className="text-gray-400 mr-2" />
          <span className="text-sm">
            {passengers.adults + passengers.children + passengers.infants} adult
            {passengers.adults + passengers.children + passengers.infants > 1
              ? "s"
              : ""}
            , Economy
          </span>
        </div>

        {/* Search button */}
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 flex items-center justify-center hover:opacity-90 transition">
          <Search />
        </button>
      </div>
    </div>
  );
}
