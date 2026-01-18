
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDailyBriefing(userName: string = "Commander", persona: string = "digital oracle") {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, motivational greeting for a 'Magic Mirror' display. 
      The user's name is ${userName}. Your persona is a ${persona}.
      It should be one punchy sentence. 
      Also give me a one-sentence 'Daily Focus' related to being productive or mindful. 
      Format: JSON { "greeting": "...", "focus": "..." }`,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini failed:", error);
    return {
      greeting: `Welcome home, ${userName}.`,
      focus: "Your focus today is precision and growth."
    };
  }
}
