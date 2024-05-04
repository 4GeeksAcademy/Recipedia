import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChatBot } from "./chatbot/chatbot";

export const Navbar = () => {
    const [showChatBot, setShowChatBot] = useState(false);

    return (
        <nav className="navbar d-flex" style={{width:"90%", marginBottom: '-30px'}}>
            <div className="ml-auto d-flex justify-content-start">
                <span className="navbar m-5">Filters</span>
                <span className="navbar" onClick={() => setShowChatBot(!showChatBot)}>Chatbot</span>
            </div>
          
            <div className="ml-auto me-3">
                <span className="navbar">Login</span>
            </div>
			<div className="chatbot col-12" style={{ marginTop: "-40px", }}>{showChatBot && <ChatBot setShowChatBot={setShowChatBot} />}</div>
            {/* <Link className="btn btn-primary" to="/recipe/dummyrecipe">
                Dummy Details
              </Link> */}
        </nav>
    );
};
