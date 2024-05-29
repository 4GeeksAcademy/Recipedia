import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import background from "../../img/background.png";
import { Link } from "react-router-dom";
import HomepageRecipe from "../component/homepageRecipe";

export const Home = ({ setOrigin }) => {
  const { store, actions } = useContext(Context);
  const filteredRecipes = store.filteredRecipes || []
  const homeRecipes = store.homeRecipes || [];
  const chatbotMessage = store.chatbotMessage; // Flag to track chatbot messages

  useEffect(() => {
    actions.getRandomRecipe();
  }, []);

  return (
      <div className="text-center mt-5" style={{ minHeight: "100vh"}}>
        <img src={background} style={{ width: "100%", position:"absolute", zIndex:"-1", left:"0"}} alt="Background" />
        {!chatbotMessage && (
        store.filterStatus === false ? (
          homeRecipes.map((recipe, index) => (
            <HomepageRecipe key={index} recipe={recipe} setOrigin={setOrigin} />
          ))
        ) :  ( store.filteredRecipes?.map((recipe, index) => (
          <HomepageRecipe key={index} recipe={recipe} setOrigin={setOrigin} />
        ))
      )
        )}
      </div>
    );
  };

export default Home;
