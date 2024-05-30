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
    <div
      className="chatbot-container"
      style={{ zIndex: "3", position: "relative" }}
    >
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && input != "") {
              sendMessage();
            }
          }}
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
        style={{ fontFamily: "avenir-light", color303131: "#" }}
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
                marginTop: "50px",
              }}
            >
              {/* //recipes */}
              {message.recipes?.map((recipe, idx) => {
                let parts = recipe.link.split("/");
                let recipeString = parts[parts.length - 1];
                let recipeStringParts = recipeString.split("-");
                let recipeId = recipeStringParts[recipeStringParts.length - 1];
                return (
                  <div
                    style={{
                      display: "inline-block",
                      width: "15vw", // Set width relative to viewport width
                      height: "40vh", // Set height relative to viewport height
                      margin: "30px",
                      overflow: "hidden",
                      color: "white",
                      fontFamily: "avenir-light",
                      borderRadius: "10px",
                      maxWidth: "100%",
                      marginTop: "100px",
                    }}
                  >
                    <div
                      key={idx}
                      className="card-title"
                      style={{
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        onClick={() => {
                          setShowChatBot(false);
                          setOrigin("chatbot");
                          navigate("/recipe/" + recipe.title);
                        }}
                        src={recipe.image}
                        style={{
                          maxHeight: "25vh", // Maintain maximum height
                          maxWidth: "100%", // Maintain maximum width
                          width: "380px", // Allow the width to adjust based on the aspect ratio
                          borderRadius: "10px",
                          marginTop: "16px",
                          cursor: "pointer", // Add cursor pointer to indicate it's clickable
                          // boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Add a shadow for better visibility
                          transition: "box-shadow 0.3s ease-in-out",
                        }}
                        alt={recipe.title}
                        onMouseEnter={(e) => {
                          e.target.style.boxShadow =
                            "0 0 20px rgba(255, 255, 255, 0.8)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.boxShadow =
                            "2px 2px 4px rgba(0, 0, 0, 0.8)";
                        }}
                      />
                      <div
                        className="card-body d-flex"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h5
                          style={{
                            paddingLeft: "30px",
                            textAlign: "center",
                            fontSize: "30px", // Increased font size
                            maxWidth: "80%",
                            height: "3em",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                          }}
                          onClick={() => {
                            setShowChatBot(false);
                            setOrigin("chatbot");
                            navigate("/recipe/" + recipe.title);
                          }}
                          className="card-title"
                        >
                          {recipe.title}
                        </h5>
                        <span style={{ paddingRight: "10px" }}>
                          {store.favourites.find(
                            (item) => item.title == recipe.title
                          ) ? (
                            <svg
                              onClick={() => actions.deleteFavourite(recipeId)}
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="#E84A43"
                              className="bi bi-heart-fill"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={() =>
                                actions.addFavourites(
                                  recipe.title,
                                  recipe.image,
                                  recipeId
                                )
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="#E84A43"
                              class="bi bi-heart"
                              viewBox="0 0 16 16"
                            >
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
