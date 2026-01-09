
import { GoogleGenAI } from "@google/genai";

// Creates a new GoogleGenAI instance for each call to ensure the latest API key is used
const createAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AuthAdviceResponse {
  text: string;
  sources?: { title: string; uri: string }[];
}

export const getAuthAdvice = async (
  userQuery: string, 
  history: { role: string, parts: any[] }[], 
  model: string = 'gemini-3-pro-preview'
): Promise<AuthAdviceResponse> => {
  try {
    const ai = createAI();
    
    // Configure advanced features for Pro models
    const isPro = model.includes('gemini-3-pro') || model.includes('gemini-2.5-pro');
    
    const config: any = {
      systemInstruction: `You are the "Auth Oracle", a world-class security architect specializing in modern authorization frameworks.
      You are an expert in:
      1. OpenFGA (ReBAC, Zanzibar, Relationship tuples).
      2. Oso (Policy-as-code, Polar logic, Logic engines).
      3. Gauth_go (Agency-based auth, fiduciary duty, legal liability in digital systems).
      
      Compare these frameworks objectively. Help the user choose the right one based on their specific needs.
      Always try to provide real-world architectural patterns.
      Keep your tone professional, high-tech, and insightful. Use bullet points for readability.`,
      temperature: 0.7,
    };

    // Add search tool for grounding news/updates if it's a Pro model
    if (isPro) {
      config.tools = [{ googleSearch: {} }];
      // Allocate thinking budget for deeper architectural reasoning
      config.thinkingConfig = { thinkingBudget: 4000 };
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userQuery }] }
      ],
      config: config
    });
    
    const text = response.text || "The Oracle remains silent.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter(Boolean) as { title: string; uri: string }[];

    return { text, sources };
  } catch (error: any) {
    console.error("Gemini Advice Error:", error);
    if (error.message?.includes("Requested entity was not found")) {
      return { text: "ERROR: Selected model not available or key invalid. Please verify your API key in settings." };
    }
    return { text: "The Auth Oracle is currently disconnected. Connection failure in the architectural mesh." };
  }
};

export const generateInfographicImage = async (prompt: string, model: string = 'gemini-2.5-flash-image') => {
  try {
    const ai = createAI();
    const isPro = model === 'gemini-3-pro-image-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          ...(isPro ? { imageSize: "1K" } : {})
        },
        // Real-time info for high-quality renders
        ...(isPro ? { tools: [{ googleSearch: {} }] } : {})
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
