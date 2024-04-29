import React, { useState } from "react";

export const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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
        "https://spoonacular.com/chatbot/converse?k=" +
          process.env.SPOONACULAR_API_KEY +
          "%C2%A7" +
          input
      );

      if (response.status != 200) {
        alert("an error ocurred while sending your message");
      } else {
        let data = await response.json();
        console.log(data);
        setMessages([
          ...messages,
          {
            text: data.answerText,
            sender: "ChefBot",
            recipes: data.media,
          },
        ]);

        setInput("");
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>
              {message.sender} : {message.text}
            </p>
            <div className="row container mx-auto">
              {message.recipes?.map((recipe, idx) => (
                <div className="col-2">
                  <div key={idx} className={`card w-100`}>
                    <img
                      src={recipe.image}
                      className="card-img-top"
                      alt={recipe.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.title}</h5>
                      <div className="actions">
                        <a className="btn btn-primary" href={recipe.link}>
                          Details
                        </a>
                      </div>
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