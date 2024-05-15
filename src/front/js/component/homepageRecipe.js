import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import background from "../../img/background.png";

const HomepageRecipe = ({ recipe, setOrigin }) => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "inline-block",
        width: "15vw", // Set width relative to viewport width
        height: "32vh", // Set height relative to viewport height
        margin: "0 10px",
        overflow: "hidden",
        // background: "rgba(250,250,250, 0.8)",
        color: "white",
        fontFamily: "avenir-light",
        borderRadius: "10px",
        // borderColor: "black",
        maxWidth: "100%",
        marginTop: "100px",
        
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // border: "2px solid white", 
            borderRadius: "10px", 
            overflow: "hidden",
            marginBottom: "10px"
          }}
        >
          <img
            src={recipe.image}
            style={{ 
              maxHeight: "150px", 
                        maxWidth: "100%", 
                        width: "auto", 
                        borderRadius: "10px", 
                        marginTop: "30px", 
                        display: "block", 
                        margin:"auto", 
                        marginTop: "16px",
                        border: "2px solid white",
            }}
            alt="Recipe"
            onClick={() => {
              setOrigin("home");
              navigate("/recipe/" + recipe.title);
            }}
          />
        </div>
        <h5
  style={{
    textAlign: "center",
    fontSize: "20px",
    maxWidth: "80%",
    height: "3em", 
    overflow: "hidden",
    textOverflow: "ellipsis",
    // WebkitTextStroke: "1px black", // Add black border around letters
  }}
>

          <strong>{recipe.title}</strong>
        </h5>
      </div>
    </div>
  );
};

export default HomepageRecipe;
