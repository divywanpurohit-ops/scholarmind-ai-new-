import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    // Build conversation history for Gemini
    const conversationParts = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: `You are ScholarMind AI Research Copilot — a brilliant, friendly AI assistant built into an academic research platform. You can help with:
- Research queries, academic concepts, and scientific explanations
- Poetry, creative writing, and philosophical thoughts
- General knowledge, coding, and problem-solving
- Summarizing papers, explaining theories, generating ideas

Respond in a conversational, helpful tone. Use markdown formatting when helpful. Keep responses concise but insightful. If the user writes in Hindi or Urdu, respond in the same language.`
            }]
          },
          contents: conversationParts,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Copilot API Error:", error);
    return NextResponse.json({ error: "Failed to process your request." }, { status: 500 });
  }
}
