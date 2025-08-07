"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

// Message type used for chat messages
type Message = {
  role: "assistant" | "user"; // Role of the speaker
  content: string; // Message content
  type?: "cards"; // Optional: type of message (e.g., special card)
  timestamp?: string; // Optional: time the message was sent
  loading?: boolean; // Optional: used to show typing/loading
};

export default function ChatPage() {
  // Stores all chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Input text state
  const [input, setInput] = useState("");

  // Typing state to show loading animation
  const [isTyping, setIsTyping] = useState(false);

  // Ref to scroll to latest message
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending the user message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add user message to state
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.reply) {
        const botMessage: Message = {
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Fallback error message
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Oops! Something went wrong. Try again.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry! I couldn’t connect to the AI server.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-3xl mx-auto px-4 pt-10 pb-24">
      {/* Chat Messages Area */}
      <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto p-6 space-y-4 bg-transparent">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative p-4 rounded-xl max-w-[80%] whitespace-pre-line text-sm md:text-base ${
              msg.role === "user"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white self-end"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {/* Message content */}
            <div>{msg.content}</div>

            {/* Timestamp */}
            {msg.timestamp && (
              <div className="absolute bottom-[-1.2rem] right-2 text-xs text-gray-400">
                {msg.timestamp}
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing animation (fake loading) */}
        {isTyping && (
          <div className="self-start bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl animate-pulse">
            Nomadisch is typing...
          </div>
        )}

        {/* Invisible element to scroll to */}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="w-full flex mt-4">
        <input
          type="text"
          placeholder="Where do you want to go next?"
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
