import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatBot } from "./chatbot/chatbot";
import recipedia from "../../img/recipedia.png"

export const Navbar = () => {
    const [showChatBot, setShowChatBot] = useState(false);

    return (
        <nav className="navbar d-flex" style={{width:"90%", marginBottom: '-30px'}}>
            <div className="navbar col-12" style={{justifyContent:"center"}}> <img src={recipedia} style={{width: "250px", height: "auto"}} alt="recipedia" /></div>
            <div className="ml-auto d-flex justify-content-start">
                <span className="navbar m-5">Filters</span>
                <span className="navbar" onClick={() => setShowChatBot(!showChatBot)}>Chatbot</span>
            </div>
          
            <div className="ml-auto me-3">
                <button className="navbar">Login</button>
            </div>
			<div className="chatbot col-12" style={{ marginTop: "-40px", }}>{showChatBot && <ChatBot setShowChatBot={setShowChatBot} />}</div>
            {/* <Link className="btn btn-primary" to="/recipe/dummyrecipe">
                Dummy Details
              </Link> */}
        </nav>
    );
};
{/* <button onClick={()=> {
setShowChatBot(false)
navigate("/recipe/"+recipe.title)
}} className="btn btn-primary">
Details
</button> */}