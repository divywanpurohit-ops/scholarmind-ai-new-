import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang, mode } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (mode === "humanize") {
      const result = await aiService.humanizeText(text);
      return NextResponse.json({ result });
    } else {
      const result = await aiService.translateText(text, targetLang || "Hindi");
      return NextResponse.json({ result });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
