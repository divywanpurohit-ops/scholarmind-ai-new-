import { NextResponse } from "next/server";
import { aiService } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const summary = await aiService.summarizePaper(content);
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
