import { GoogleGenerativeAI } from "@google/generative-ai";

// Note: In a production app, the API key should be handled via environment variables 
// or fetched from a secure database per user.
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const aiService = {
  /**
   * Summarizes a research paper based on its content or abstract.
   */
  async summarizePaper(content: string) {
    if (!API_KEY) return "API Key not configured. Please add your Gemini key in Settings.";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `As a world-class academic researcher, summarize the following paper content. 
      Focus on: 1. Core Objective, 2. Methodology, 3. Key Findings, and 4. Limitations.
      Use professional, concise academic language.
      
      Paper Content:
      ${content}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Summarization Error:", error);
      return "Error generating summary. Please try again later.";
    }
  },

  /**
   * Generates a structured slide deck (PPT) outline from a research topic.
   */
  async generatePPTOutline(topic: string) {
    if (!API_KEY) return null;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Create a professional 5-slide academic presentation outline for the topic: "${topic}".
      Return the response as a JSON array of objects with 'title' and 'bullets' (array of 3 points).
      Format: [{"title": "...", "bullets": ["...", "...", "..."]}, ...]`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Basic JSON extraction logic (in a real app, use structured output)
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error("Gemini PPT Generation Error:", error);
      return null;
    }
  },

  /**
   * Analyzes research gaps by comparing multiple paper titles/abstracts.
   */
  async analyzeResearchGaps(papers: string[]) {
    if (!API_KEY) return "API Key not configured.";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Analyze the following research papers and identify 3 potential research gaps or future directions for study:
      
      ${papers.join("\n---\n")}
      
      Provide actionable, high-level scientific directions.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Gap Analysis Error:", error);
      return "Error analyzing research gaps.";
    }
  },

  /**
   * Translates academic text while preserving scientific context.
   */
  async translateText(text: string, targetLang: string) {
    if (!API_KEY) return "API Key not configured.";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Translate the following academic/scientific text into ${targetLang}. 
      Ensure that technical terms and scientific nomenclature are preserved or translated with high accuracy. 
      Maintain a professional, academic tone.
      
      Text:
      ${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Translation Error:", error);
      return "Error translating text.";
    }
  },

  /**
   * Humanizes AI-generated or translated text to make it sound more natural.
   */
  async humanizeText(text: string) {
    if (!API_KEY) return "API Key not configured.";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Rewrite the following text to sound more like it was written by a human academic expert. 
      Avoid common AI patterns, improve flow, and ensure it sounds natural while keeping the professional scientific content intact.
      
      Text:
      ${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Humanize Error:", error);
      return "Error humanizing text.";
    }
  }
};
