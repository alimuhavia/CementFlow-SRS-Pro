
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async refineRequirement(prompt: string, currentContext: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          You are a senior software requirements analyst specializing in industrial ERP systems.
          User is looking at this SRS context: ${currentContext}.
          They have a question or request: ${prompt}.
          
          Please provide a detailed, professional response that helps improve or clarify the SRS for a cement shop. 
          Use clear bullet points and professional tone.
        `,
      });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while consulting the AI. Please try again.";
    }
  }
}

export const geminiService = new GeminiService();
