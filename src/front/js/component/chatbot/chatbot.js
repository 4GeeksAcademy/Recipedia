import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";


export const ChatBot = ({setShowChatBot}) => {
  const {store, actions} = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate=useNavigate();
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
        console.log(data);
        setMessages([
          ...messages,
          {
            text: data.answerText,
            sender: "ChefBot",
            recipes: data.media,
          },
        ]);
        actions.addRecipes(data.media)
        setInput("");
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="ml-auto chatbot-input" style={{ display: 'flex', alignItems: 'center', margin: '0 5% 0 0'}}>
        <input
          className="chatbot-input"
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Not sure what to eat? Try our AI.."
          style={{ flex: '1', maxWidth: '100%', borderRadius: '5px', border: '1px solid grey', padding: '8px', margin: '0 2px 0 0'}}
        />
        <button onClick={sendMessage} style={{
          backgroundColor: 'white',
          border: '1px solid grey',
          borderRadius: '5px',
          padding: '8px'
        }}>Send</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p style={{fontFamily: "avenir light", fontSize: "16px"}}>
            {message.sender} : {message.text}
            </p>
            <div className="row container mx-auto">
              {message.recipes?.map((recipe, idx) => (
                <div className="col-2">
                  <div key={idx} className={`card w-100`}>
                    <img onClick={()=> {
                          setShowChatBot(false)
                          navigate("/recipe/"+recipe.title)
                        }}
                      src={recipe.image}
                      className="card-img-top"
                      alt={recipe.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.title}</h5>
                      <div className="actions">
                        <button onClick={()=> {
                          setShowChatBot(false)
                          navigate("/recipe/"+recipe.title)
                        }} className="btn btn-primary">
                          Details
                        </button>
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