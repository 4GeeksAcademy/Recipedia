import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import background from "../../img/background.png";
import { Link, useLocation } from "react-router-dom";
import HomepageRecipe from "../component/homepageRecipe";
import { FilteredRecipes } from "./FilteredRecipes";


export const Home = ({ setOrigin }) => {
  const { store, actions } = useContext(Context);

  const homeRecipe = store.homeRecipe || [];
  const filteredRecipes = store.filteredRecipes || []
  const chatbotMessage = store.chatbotMessage; // Flag to track chatbot messages

  // useEffect(() => {
  //   if (homeRecipe.length > 0) {
  //     setShowFilters(false);
  //   } else if (filteredRecipes.length > 0) {
  //     setShowFilters(true);
  //   }
  // }, [homeRecipe, filteredRecipes]);

  console.log(filteredRecipes)

  console.log("this is the homerecipe", homeRecipe);
  return (
    <div className="text-center mt-5" style={{ minHeight: "100vh"}}>
      <img src={background} style={{ width: "100%", position:"absolute", zIndex:"-1", left:"0"}} alt="Background" />
      {store.filterStatus === false ?
        homeRecipe.map((recipe, index) => (
          <HomepageRecipe key={index} recipe={recipe} setOrigin={setOrigin} />
        ))
      : store.filteredRecipes?.map((recipe, index) => (
        <HomepageRecipe key={index} recipe={recipe} setOrigin={setOrigin} />
      ))
      }
    </div>
  );
};


export default Home;
