import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChatBot } from "./chatbot/chatbot";

export const Navbar = () => {
    const [showChatBot, setShowChatBot] = useState(false);

    return (
        <nav className="navbar">
            <div className="ml-auto d-flex justify-content-start">
                <span className="navbar m-5">Filters</span>
                <span className="navbar" onClick={() => setShowChatBot(!showChatBot)}>Chatbot</span>
            </div>
          
            <div className="ml-auto me-5">
                <span className="navbar">Login</span>
            </div>
			<div className="chatbot col-12">{showChatBot && <ChatBot />}</div>
        </nav>
    );
};
