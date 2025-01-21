import { generateResponse } from "../gemini/chat.js";
import Message from "../models/chat.js";

export const chatHandler = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user._id;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    // Fetch existing message history
    let message = await Message.findOne({ user: userId });
    
    // Format history correctly for Gemini API
    const history = message ? message.content.map(chat => ([
      { role: 'user', content: chat.prompt },
      { role: 'model', content: chat.response }
    ])).flat() : [];

    // Generate response with properly formatted history
    const aiResponse = await generateResponse(prompt, history);

    if (!aiResponse.success) {
      return res.status(500).json(aiResponse);
    }

    if (!message) {
      message = new Message({
        role: "user",
        user: userId,
        content: [],
      });
    }

    // Add new chat to the content array
    message.content.push({
      prompt: prompt,
      response: aiResponse.data,
    });

    await message.save();

    return res.status(200).json({
      success: true,
      data: aiResponse.data,
    });
  } catch (error) {
    console.error('Chat Handler Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const message = await Message.findOne({ user: userId })
      .select("content")
      .lean();

    if (!message || message.content.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No chat history found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      data: message.content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch chat history",
    });
  }
};