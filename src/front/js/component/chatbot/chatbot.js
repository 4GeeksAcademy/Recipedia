import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

export const ChatBot = () => {
  const {store, actions} = useContext(Context);
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
        "https://api.spoonacular.com/food/converse?apiKey=" +
          process.env.SPOONACULAR_API_KEY +
          "&text=" +
          input
      );

      if (response.status != 200) {
        alert("an error ocurred while sending your message");
      } else {
        let data = await response.json();
        for (let i = 0; i< data.media.length; i++){
          let parts = data.media[i].link.split("/")
          let recipeString = parts[parts.length-1]
          let recipeStringParts = recipeString.split("-")
          let recipeId = recipeStringParts[recipeStringParts.length-1]
         let resp = await fetch ("https://api.spoonacular.com/recipes/"+recipeId+"/information?apiKey=" +
          process.env.SPOONACULAR_API_KEY
          )
          let info = await resp.json();
          data.media[i]["info"]=info
          data.media[i]["id"]=recipeId
        }
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
      <div className="ml-auto chatbot-input">
        <input
          classname="chatbot-input"
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Not sure what to eat? Try our AI.."
          style={{ width: '2066px', borderRadius: '5px', border: '1px solid grey', padding: '8px' }}
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
                        <Link className="btn btn-primary" to={"/recipe/"+recipe.title}>
                          Details
                        </Link>
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