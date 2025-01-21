import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBbqvhcEK0datDi9SGm994PJAUK7MnL3Vw";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateResponse = async (prompt, history = []) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Format history correctly
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{text: msg.content}]
    }));

    // Start a chat with properly formatted history
    const chat = model.startChat({
      history: formattedHistory
    });

    // Send the message with prompt as an array containing a text object
    const result = await chat.sendMessage([{text: prompt}]);
    const response = await result.response;
    
    return {
      success: true,
      data: response.text(),
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    console.log('Prompt received:', prompt);
    console.log('History received:', history);
    return {
      success: false,
      error: error.message || "Failed to generate response",
    };
  }
};