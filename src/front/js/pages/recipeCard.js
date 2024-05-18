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
          process.env.SPOONACULAR_API_KEY
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
            width: "100rem",
            padding: "50px 30px 50px 30px",
            maxWidth: "800px",
            // alignItems: "center",
            maxHeight: "1500px",
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
            <img
              src={recipe?.image}
              style={{ width: "600px", height: "auto", borderRadius: "5px" }}
            />
          </span>

          <div
            className="row"
            style={{
              maxWidth: "90%",
              margin: "40px 0 0 40px",
              fontSize: "16px",
              textAlign: "initial",
              justifyContent: "flex-start",
            }}
          >
            <div className="col-sm-12 mb-3 mb-sm-0">
              <div className="card" style={{ borderColor: "white" }}>
                <div className="card-body">
                  <h5 className="card-title">COOKING MINUTES</h5>
                  <p className="card-text" style={{ fontSize: "20px" }}>
                    {recipeInfo?.readyInMinutes}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="card" style={{ borderColor: "white" }}>
                <div className="card-body" style={{ textAlign: "justify" }}>
                  <h5 className="card-title">
                    INGREDIENTS
                  </h5>
                  {recipeInfo?.extendedIngredients?.map((ingredient, index) => {
                    return (
                      <>
                        {ingredient.original}
                        {index == recipeInfo.extendedIngredients.length - 1
                          ? "."
                          : ", "}
                      </>
                    );
                  })}
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
            <div className="card" style={{ borderColor: "white", padding:"0 25px 0 25px"}}>
            <h5 className="card-title">PREPARATION</h5>
              {/* <>{recipeInfo?.instructions}
            </> */}
            <ol className="list-group">
          {recipeInfo?.analyzedInstructions[0].steps.map((item, index)=>{
            return(
              <li className="list-group-item">
                {item.step}
              </li>
            );
          })}
          </ol>
          </div>
          {store.favourites.find((item)=> item.title == recipe.title)? (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>) : (<svg onClick={(()=> actions.addFavourites(recipe.title, recipe.image, recipeInfo.summary, recipeInfo.id))} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>)
} 
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100rem",
            display: "flex",
            background: "white",
            flexDirection: "column",
            padding: "20px",
            maxWidth: "800px",
            maxHeight: "1500px",
            alignItems: "center",
            textAlign: "justify" 
          }}
        >
          <h2 style={{margin: "50px 30px 50px 30px",
              fontSize: "30px",}}>{title}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            
            <div style={{ width: "600px", height: "auto", borderRadius: "5px" }}>
              <img src={store.imageURL} alt="recipe" />
            </div>
          )}
          <div className="row" style={{margin: "0 80px 0 50px"}}>
          <div className="col-sm-12 mb-3 mb-sm-0">
              <div className="card" style={{ borderColor: "white", margin:"20px 0 0 0" }}>
                <div className="card-body" >
          <h5 className="card-title">
          COOKING MINUTES{" "}
            <p className="card-text" style={{ fontSize: "20px", fontWeight: "normal" }}>{store.cookingTime}</p> 
          </h5>
          </div>
          </div>
          </div>
          <div className="col-sm-12">
              <div className="card" style={{ borderColor: "white", }}>
                <div className="card-body">
          <h5 className="card-title">
          INGREDIENTS</h5> <>{store.ingredients}</>
          </div>
          </div>
          </div>
          <div className="card" style={{ borderColor: "white", padding:"0 25px 0 25px"}}>
          <h5 className="card-title">PREPARATION</h5>
              <>{store.instructions} </>
          </div>
          {/* {store.favourites.find((item)=> item.title == recipe.title)? (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>) : (<svg onClick={(()=> actions.addFavourites(recipe.title, recipe.image, recipeInfo.summary, recipeInfo.id))} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>)
}  */}
          {/* <div
            className="card-text"
            style={{
              width: "600px",
              textAlign: "justify",
              marginTop: "10px",
            }}
          >
            {analyzedInstructions.map((step, index) => (
              <p  className="card-text" key={index}>{step.step}</p>
            ))}
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
