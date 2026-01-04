
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askPhysicsQuestion(
    history: Message[],
    currentMessage: string,
    topic?: string
  ) {
    const systemInstruction = `
      Você é o Dr. Sam Owens, um cientista amigável mas sério do Laboratório de Hawkins.
      Sua missão é ensinar física, especificamente sobre o Tempo e Espaço, para estudantes curiosos.
      Use analogias de Stranger Things (Mundo Invertido, rádio amador, Walkie-Talkies, Eleven, Demogorgon) para explicar conceitos complexos como Relatividade e Entropia.
      Mantenha um tom de mistério dos anos 80, mas seja cientificamente preciso.
      Sempre responda em Português do Brasil.
      Se o tópico for "${topic}", foque especificamente nele.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(m => ({
            role: m.role === 'user' ? 'user' as const : 'model' as const,
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: currentMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        },
      });

      return response.text || "Ocorreu um erro na comunicação com o laboratório...";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "O portal está instável. Não conseguimos processar sua pergunta agora.";
    }
  }

  async getGroundingSearch(query: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      return {
        text: response.text,
        sources: chunks?.map(c => ({ title: c.web?.title, uri: c.web?.uri })) || []
      };
    } catch (error) {
      return { text: "Erro ao buscar dados reais.", sources: [] };
    }
  }
}

export const geminiService = new GeminiService();
