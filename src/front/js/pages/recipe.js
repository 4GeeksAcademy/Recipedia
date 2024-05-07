import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import background from "../../img/background.png";

export const Recipe = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [recipe, setRecipe] = useState();
  const [recipeInfo, setRecipeInfo] = useState({});

  useEffect(() => {
    setRecipe(
      store.recentlyFetchedRecipes.find((item) => item.title == params.title)
    );
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      let parts = recipe.link.split("/");
      let recipeString = parts[parts.length - 1];
      let recipeStringParts = recipeString.split("-");
      let recipeId = recipeStringParts[recipeStringParts.length - 1];
      let resp = await fetch(
        "https://api.spoonacular.com/recipes/" +
          recipeId +
          "/information?apiKey=" +
          process.env.SPOONACULAR_API_KEY
      );
      let info = await resp.json();
      setRecipeInfo(info);
    };
    if (recipe) {
      getInfo();
    }
  }, [recipe]);
  
  return (
    <div
      className="jumbotron text-center d-flex mt-5"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "50px 0 20px 0",
        minHeight: "100vh",
        justifyContent: "space-around",
      }}
    >
		{/* <button onClick={()=> (console.log(recipeInfo))}>click here</button> */}
      <div
        className="card"
        style={{
          width: "100rem",
          padding: "50px 30px 50px 30px",
          maxWidth: "800px",
          // alignItems: "center",
          maxHeight: "1500px"
        }}
      >
        <h5
          className="card-title"
          style={{
            margin: "50px 30px 50px 30px",
            fontSize: "30px",
          }}
        >
          {recipe?.title}
        </h5>
        <span>
          <img src={recipe?.image} style={{width: "600px", height: "auto", borderRadius: "5px",}}/>
        </span>

        <div className="row" style={{ maxWidth: "90%", margin:"40px 0 0 40px", fontSize: "16px", textAlign:"initial", justifyContent: "flex-start"}}>
          <div className="col-sm-12 mb-3 mb-sm-0">
            <div className="card" style={{borderColor:"white"}}>
              <div className="card-body">
                <h5 className="card-title">COOKING MINUTES</h5>
                <p className="card-text" style={{fontSize:"20px"}}>{recipeInfo?.readyInMinutes}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card" style={{borderColor:"white"}}>
              <div className="card-body">
                <h5 className="card-title" style={{textAlign: "justify", }}>INGREDIENTS</h5>
                {recipeInfo?.extendedIngredients?.map((ingredient, index)=>{
                  return (
                    <>
                      {ingredient.original}{index==recipeInfo.extendedIngredients.length-1?".":", "}
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row card-body" style={{maxWidth: "90%", margin: "10px 0 0 40px", textAlign:"initial", justifyContent: "flex-start"}}>
        <h5 className="card-title">PREPARATION</h5>
          <p
            className="card-text"
            style={{width: "600px"}}
          >
            {recipeInfo?.instructions}
          </p>
        </div>
      </div>
    </div>
  );
};