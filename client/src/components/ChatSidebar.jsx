import React, { useContext, useState } from "react";
import { MessageCircle, Plus, ChevronLeft, Trash2, LogOut } from "lucide-react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ChatSidebar = ({ onNewChat, activeChat, onSelectChat, onClearHistory }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { chats, setIsAuthenticated, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5001/api/v1/user/logout", {
        withCredentials: true,
      });
      
      // Clear context
      setIsAuthenticated(false);
      setUser({});
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const getChatPreview = (chat) => {
    if (!chat) return "New Chat";
    
    // Check if chat has messages array (new schema)
    if (chat.messages && chat.messages.length > 0) {
      return chat.messages[0].content.substring(0, 30) + "...";
    }
    
    // Fallback for old schema
    if (chat.text) {
      return chat.text.substring(0, 30) + "...";
    }
    
    return "New Chat";
  };

  const getChatDate = (chat) => {
    if (!chat) return "";
    
    const date = chat.timestamp || chat.lastModified || chat.createdAt;
    return date ? new Date(date).toLocaleDateString() : "";
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={onNewChat}
        className="flex items-center gap-3 p-3 m-2 rounded hover:bg-gray-700 transition-colors"
      >
        <Plus size={20} />
        {!isCollapsed && <span>New Chat</span>}
      </button>

      <div className="flex-grow overflow-y-auto">
        {Array.isArray(chats) &&
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => onSelectChat(chat)}
              className={`flex items-center gap-3 p-3 mx-2 rounded hover:bg-gray-700 cursor-pointer transition-colors ${
                activeChat?._id === chat._id ? "bg-gray-700" : ""
              }`}
            >
              <MessageCircle size={20} />
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <div className="truncate text-sm">{getChatPreview(chat)}</div>
                  <div className="text-xs text-gray-400">{getChatDate(chat)}</div>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="border-t border-gray-700 p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 w-full transition-colors"
        >
          <ChevronLeft
            size={20}
            className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`}
          />
          {!isCollapsed && <span>Collapse</span>}
        </button>

        {!isCollapsed && (
          <>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 w-full mt-2 transition-colors text-red-400 hover:text-red-300"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
            <button
              onClick={onClearHistory}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 w-full mt-2 transition-colors"
            >
              <Trash2 size={20} />
              <span>Clear History</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;