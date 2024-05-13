import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ChatBot = ({ setShowChatBot, setOrigin }) => {
  const { store, actions } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() !== "") {
      setMessages([
        ...messages,
        {
          text: input,
          sender: "user",
        },
      ]);

      let response = await fetch(
        "https://api.spoonacular.com/food/converse?apiKey=" +
          process.env.SPOONACULAR_API_KEY +
          "&text=" +
          input
      );

      if (response.status != 200) {
        alert("an error ocurred while sending your message");
      } else {
        let data = await response.json();
        actions.handleChatbotMessage();
        console.log(data);
        setMessages([
          ...messages,
          {
            text: data.answerText,
            sender: "ChefBot",
            recipes: data.media,
          },
        ]);
        actions.addRecipes(data.media);
        setInput("");
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div
        className="ml-auto chatbot-input"
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 5% 0 0",
          fontFamily: "avenir-light",
          color: "#303131",
        }}
      >
        <input
          className="chatbot-input"
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Not sure what to eat? Try our AI.."
          style={{
            flex: "1",
            maxWidth: "100%",
            borderRadius: "5px",
            border: "1px solid grey",
            padding: "8px",
            margin: "0 2px 0 0",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "white",
            border: "1px solid grey",
            borderRadius: "5px",
            padding: "8px",
          }}
        >
          Send
        </button>
      </div>
      <div
        className="chatbot-messages"
        style={{ fontFamily: "avenir-light", color: "#303131" }}
      >
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p
              style={{
                fontFamily: "avenir light",
                fontSize: "28px",
                margin: "20px 0 20px 0",
              }}
            >
              {message.sender} : {message.text}
            </p>
            <div
              className="row ml-auto"
              style={{
                display: "flex",
                justifyContent: "center",
                maxHeight: "0",
                width: "auto",
                marginTop:"50px"
              }}
            > 
            {/* //recipes */}
              {message.recipes?.map((recipe, idx) => (
                <div
                  className="col-2"
                  style={{ display: "inline-block",
                  width: "15vw", // Set width relative to viewport width
                  height: "32vh", // Set height relative to viewport height
                  margin: "0 5px",
                  overflow: "hidden",
                  background: "rgba(250, 250, 250, 1)",
                  color: "#303131",
                  fontFamily: "avenir-light",
                  borderRadius: "10px",
                  // border: "1px solid black",
                  maxWidth: "100%",
                  marginTop: "37px",
                  // marginTop: "50px",
                  // padding: "16px",
                }}
                >
                  <div key={idx} className="card-title" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
                    <img
                      onClick={() => {
                        setShowChatBot(false);
                        setOrigin("chatbot");
                        navigate("/recipe/" + recipe.title);
                      }}
                      src={recipe.image}
                      style={{ maxHeight: "150px", maxWidth: "100%", width: "auto", borderRadius: "5px", marginTop: "30px", display: "block", margin:"auto", marginTop: "16px"}}
                      className="card-img-top"
                      alt={recipe.title}
                    />
                    <div className="card-body">
                      <h5
                        style={{ textAlign: "center", fontSize:"20px",}}
                        onClick={() => {
                          setShowChatBot(false);
                          setOrigin("chatbot");
                          navigate("/recipe/" + recipe.title);
                        }}
                        className="card-title"
                      >
                        {recipe.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
