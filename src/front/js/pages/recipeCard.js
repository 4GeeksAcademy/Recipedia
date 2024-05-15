import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import background from "../../img/background.png";

export const RecipeCard = ({ origin }) => {
  console.log("Origin", origin);
  const { store, actions } = useContext(Context);
  // RecipeCard-Chatbot
  const params = useParams();
  const [recipe, setRecipe] = useState();
  const [recipeInfo, setRecipeInfo] = useState();
  const [fecthStatus, setFetchStatus] = useState("pending");

  useEffect(() => {
    if (store.recentlyFetchedRecipes.length != 0) {
      setRecipe(
        store.recentlyFetchedRecipes.find((item) => item.title == params.title)
      );
    } else {
      setFetchStatus("error");
    }
  }, [params]);

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
          process.env.SPOONACULAR_API_KEY_5
      );

      if (resp.status != 200) {
        setFetchStatus("error");
      } else {
        let info = await resp.json();
        setRecipeInfo(info);
        setFetchStatus("success");
      }
    };
    if (recipe) {
      getInfo();
    }
  }, [recipe]);

  // RecipeCard-Home
  const { title } = useParams();
  const [analyzedInstructions, setAnalyzedInstructions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomRecipe = store.homeRecipe.find(
      (recipe) => recipe.title === title
    );
    if (randomRecipe) {
      actions
        .getRecipeDetails(randomRecipe.id)
        .then((data) => {
          if (
            data.analyzedInstructions &&
            data.analyzedInstructions.length > 0
          ) {
            setAnalyzedInstructions(data.analyzedInstructions[0].steps);
          } else {
            setAnalyzedInstructions([]);
          }
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) =>
          console.error("Error fetching recipe details!: ", error)
        );
    }
  }, [title]);

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
        fontFamily: "avenir-light",
        color: "#303131",
      }}
    >
      {fecthStatus == "pending" && origin == "chatbot" ? (
        <div className="text-center p-5 h-25">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3">Fetching recipe information...</p>
        </div>
      ) : fecthStatus == "error" && origin == "chatbot" ? (
        <div className="bg-white text-center p-5 h-25">
          <h2 className="text-danger">Oops! Something went wrong...</h2>
          <p className="text-muted">
            We apologize for the inconvenience. Please try again later.
          </p>
        </div>
      ) : fecthStatus == "success" && origin == "chatbot" ? (
        <div
          className="card"
          style={{
            //CHATBOT RECIPE DETAILS ##############
            width: "100rem",
            padding: "50px 30px 50px 30px",
            maxWidth: "800px",
            // alignItems: "center",
            maxHeight: "1500px",
            maxWidth: "1500px"
          }}
        >




        <div style={{display: "flex", alignItems:"center", margin:"50px 30px"}}>
          <div style={{width: "600px", height:"auto", borderRadius:"5px", marginRight:"30px"}}>
            <img
              src={recipe?.image}
              style={{ maxWidth:"100%"}}
            />
          </div>
          <div style={{flex:"1"}}>
            <h2 style={{fontSize:"60px", fontStyle:"italic", wordSpacing:"normal"}}><strong>{recipe?.title}</strong></h2>
          </div>
        </div>



          <div
            className="row"
            style={{
              maxWidth: "90%",
              margin: "40px 0 0 40px",
              fontSize: "20px",
              textAlign: "initial",
              justifyContent: "flex-start",
            }}
          >
            <div className="col-sm-12 mb-3 mb-sm-0">
              <div className="card" style={{ borderColor: "white" }}>
                <div className="card-body">
                  <h5 className="card-title"><strong>COOKING MINUTES</strong></h5>
                  <p className="card-text" style={{ fontSize: "20px" }}>
                    {recipeInfo?.readyInMinutes}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="card" style={{ borderColor: "white" }}>
                <div className="card-body" style={{ textAlign: "justify" }}>




                <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginLeft: "20px",}}>
  <h5 className="card-title"><strong>INGREDIENTS</strong></h5>
  <ul style={{ listStyleType: "disc", padding: "0 0 0 20px", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", margin: "0" }}>
    {recipeInfo?.extendedIngredients?.map((ingredient, index) => (
      <li key={index} style={{ marginRight: "20px" }}>
        {ingredient.original}
      </li>
    ))}
  </ul>
</div>




                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-12"
            style={{
              maxWidth: "90%",
              margin: "10px 0 0 40px",
              textAlign: "initial",
              justifyContent: "flex-start",
              textAlign: "justify",
                marginTop: "10px",
            }}
          >
            <div className="card" style={{ borderColor: "white", padding:"0 25px 0 25px", fontSize:"20px"}}>
            <h5 className="card-title"><strong>PREPARATION</strong></h5>
            <ol className="list-group" style={{ listStyleType: "none", padding: 0 }}>
  {recipeInfo?.analyzedInstructions[0].steps.map((item, index) => {
    return (
      <li key={index} style={{ marginBottom: "8px" }}>
        <strong style={{ marginRight: "8px" }}>{index + 1}.</strong>
        {item.step}
      </li>
    );
  })}
</ol>


</div>
          </div>
        </div>
      ) : (
        <div
        //HOMERECIPE DETAILS ##############
          style={{
            width: "100rem",
            display: "flex",
            background: "white",
            flexDirection: "column",
            padding: "20px",
            maxWidth: "1500px",
            maxHeight: "1500px",
            alignItems: "center",
            textAlign: "justify" 
          }}
        >
          <div style={{ display: "flex", alignItems: "center", margin: "50px 30px" }}>
            {!loading && (
              <div style={{ width: "600px", height: "auto", borderRadius: "5px", marginRight: "30px" }}>
                 <img src={store.imageURL} alt="recipe" style={{ maxWidth: "100%" }} />
              </div>
          )}
            <div style={{ flex: "1" }}>
              <h2 style={{ fontSize: "60px", fontStyle:"italic", wordSpacing:"normal"}}><strong>{title}</strong></h2>
              {/* <h3>ADD DESCRIPTION??</h3> */}
              {/* <h5 className="card-title" style={{fontSize: "15px", marginTop:"250px"}}>
          COOKING TIME{" "}
            <p className="card-text" style={{ fontSize: "15px", fontWeight: "normal" }}>{store.cookingTime} minutes</p> 
          </h5> */}
                {loading ? (
                  <p>Loading...</p>
            ) : null}
            </div>
          </div>




          <div className="row" style={{margin: "0 80px 0 50px"}}>
          <div className="col-sm-12 mb-3 mb-sm-0">
              <div className="card" style={{ borderColor: "white", margin:"20px 0 0 0" }}>
                <div className="card-body" >
          <h5 className="card-title">
          <strong>COOKING MINUTES</strong>{" "}
            <p className="card-text" style={{ fontSize: "20px", fontWeight: "normal" }}>{store.cookingTime}</p> 
          </h5>
          </div>
          </div>
          </div>
          <div className="col-sm-12 ingredient-container" style={{border: "1px solid #ccc", padding: "10px", borderRadius:"5px", marginLeft:"20px"}}>
            <div className="card" style={{ borderColor: "white", fontSize:"20px"}}>
              <div className="card-body">
                 <h5 className="card-title"><strong>INGREDIENTS</strong></h5>
                    <ul style={{listStyleType: "disc", padding: "0 0 0 20px", display: "flex", flexDirection:"row", flexWrap:"wrap", alignItems:"flex-start", margin:"0"}}>
                      {Array.isArray(store.ingredients) && store.ingredients.map((ingredient, index) => (
                        <li key={index} style={{marginRight: "20px"}}>{ingredient}</li>
                      ))}
                    </ul>
                </div>
              </div>
          </div>


          <div className="card" style={{ borderColor: "white", padding:"0 25px 0 25px"}}>
          <h5 className="card-title"><strong>PREPARATION</strong></h5>
              {/* <>{store.instructions} </> */}
          </div>
          <ul style={{ listStyleType: 'none', fontSize: "20px"}}>
                {analyzedInstructions.map((step, index) => (
                    <li key={index} style={{marginBottom:"20px"}}>
                        <strong> {step.number}:</strong> {step.step}
                        {step.step}
                    </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
