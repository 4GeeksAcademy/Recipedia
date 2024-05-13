import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import background from "../../img/background.png";

const HomepageRecipe = ({ recipe, setOrigin }) => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div
      className="card p-0"
      style={{
        display: "inline-block",
        width: "15vw", // Set width relative to viewport width
        height: "32vh", // Set height relative to viewport height
        margin: "0 5px",
        overflow: "hidden",
        background: "rgba(250,250,250, 0.8)",
        color: "#303131",
        fontFamily: "avenir-light",
        borderRadius: "10px",
        // borderColor: "black",
        maxWidth: "100%",
        marginTop: "37px",
        
      }}
    >
      <div
        className="card-body"
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
            maxHeight: "200px",
            maxWidth: "100%",
            width: "auto",
            marginBottom: "10px",
            overflow: "hidden",
          }}
        >
          <img
            src={recipe.image}
            style={{ maxHeight: "150px", maxWidth: "100%", width: "auto", borderRadius: "5px", display: "block" }}
            alt="Recipe"
            onClick={() => {
              setOrigin("home");
              navigate("/recipe/" + recipe.title);
            }}
          />
          {/* maxheight was 100% */}
        </div>
        <h5
          className="card-title"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            fontSize: "20px",
            maxWidth: "80%",
          }}
        >
          {recipe.title}
        </h5>
      </div>
    </div>
  );
};

export default HomepageRecipe;
