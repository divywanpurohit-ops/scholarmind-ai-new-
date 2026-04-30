import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, tool } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    let prompt = "";
    switch(tool) {
      case "humanize":
        prompt = `You are an expert academic editor. Transform the following AI-generated text into a natural, sophisticated academic prose that bypasses AI detection while maintaining strict scholarly tone. Ensure the flow is logical and the vocabulary is varied but precise. Content: "${text}"`;
        break;
      case "paraphrase":
        prompt = `Paraphrase the following academic text to improve clarity, flow, and scholarly impact. Use advanced academic vocabulary and vary the sentence structure significantly. Maintain the original meaning perfectly. Content: "${text}"`;
        break;
      case "summarize":
        prompt = `Generate a concise, high-impact academic summary/abstract of the following research content. Highlight the core objective, methodology, and key findings. Content: "${text}"`;
        break;
      case "draft":
        prompt = `Develop a detailed academic expansion or draft based on the following input notes or text. Follow scholarly conventions and provide a professional tone. Content: "${text}"`;
        break;
      default:
        prompt = `Improve the following text for academic publication: "${text}"`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096, // High limit for "unlimited" feel
          },
        }),
      }
    );

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to process.";

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: "Processing failed." }, { status: 500 });
  }
}
