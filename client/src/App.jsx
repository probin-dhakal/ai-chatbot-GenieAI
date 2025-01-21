import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes ,useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import { Context } from "./main";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(Context);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
