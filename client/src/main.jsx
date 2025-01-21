import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createContext, useState } from "react";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: {},
  setUser: () => {},
  chats: [],
  setChats: () => {},
});
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        chats,
        setChats,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
