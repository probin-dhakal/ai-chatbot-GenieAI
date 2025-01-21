import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";
import ChatSidebar from "../components/ChatSidebar";
import toast from "react-hot-toast";

const ChatPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setChats } = useContext(Context);
  const [history, setHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const fetchChatHistory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/v1/chat/history",
        { withCredentials: true }
      );
      if (data.success && data.data) {
        setHistory(data.data);
        setChats(data.data);
      }
    } catch (error) {
      console.log("Failed to load chat history");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/chat/message",
        { prompt },
        { withCredentials: true }
      );

      if (data.success) {
        setHistory(prevHistory => [...prevHistory, { prompt, response: data.data }]);
        setPrompt("");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      setHistory([]);
      setChats([]);
      toast.success("Chat history cleared");
    } catch (error) {
      toast.error("Failed to clear history");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar
        chats={history}
        onNewChat={() => {
          setHistory([]);
          setChats([]);
        }}
        activeChat={null}
        onSelectChat={() => {}}
        onClearHistory={handleClearHistory}
      />

      <div className="flex flex-col flex-1">
        <div className="bg-gray-800 text-white p-4">
          <h1 className="text-lg font-semibold">Chat with AI</h1>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {history.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              Start a new conversation
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {history.map((chat, index) => (
                <div key={index} className="space-y-3">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white p-3 rounded-lg rounded-br-none max-w-[80%] break-words">
                      <p>{chat.prompt}</p>
                    </div>
                  </div>
                  
                  {/* AI response */}
                  <div className="flex justify-start">
                    <div className="bg-gray-300 text-black shadow-md p-3 rounded-lg rounded-bl-none max-w-[80%] break-words">
                      <p>{chat.response}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t shadow-md">
          <div className="flex gap-4 max-w-3xl mx-auto">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-full font-medium ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;