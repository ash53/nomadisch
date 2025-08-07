// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Call Ollama's chat API
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3", // Change to your preferred local model
        messages: [
          {
            role: "system",
            content:
              "You are Nomadisch, a smart AI travel assistant. Be friendly, helpful, and suggest cheap and creative travel options.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        stream: false, // Set to true if you want streaming responses
        options: {
          keep_alive: "30m",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", errorText);
      return NextResponse.json(
        { error: "Ollama request failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Ollama returns messages differently depending on endpoint
    // If using /api/chat, `data.message.content` will hold the text
    const reply =
      data.message?.content ||
      data.response || // fallback if using /api/generate
      "No response from Ollama";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
