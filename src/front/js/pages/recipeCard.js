import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { CookMode } from "../component/CookMode";
import "../../styles/home.css";

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
      let parts = recipe.image.split("/");
      let recipeString = parts[parts.length - 1];
      let recipeStringParts = recipeString.split("-");
      let recipeId = recipeStringParts[recipeStringParts.length - 2];
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
    const randomRecipe = store.homeRecipes.find(
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
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#F0F3F6",
        backgroundPosition: "center",
        padding: "50px 0 50px 0",
        minHeight: "100vh",
        justifyContent: "space-around",
        fontFamily: "avenir-light",
        color: "#303131",
      }}
    >
      {fecthStatus == "pending" &&
      (origin == "chatbot" || origin == "favourites" || origin == "filter") ? (
        <div className="text-center p-5 h-25">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only" style={{ fontSize: "40px" }}>
              Loading...
            </span>
          </div>
          <p className="mt-3" style={{ fontSize: "40px" }}>
            Fetching recipe information...
          </p>
        </div>
      ) : fecthStatus == "error" &&
        (origin == "chatbot" ||
          origin == "favourites" ||
          origin == "filter") ? (
        <div className="bg-white text-center p-5 h-25">
          <h2 className="text-danger" style={{ fontSize: "40px" }}>
            Oops! Something went wrong...
          </h2>
          <p className="text-muted">
            We apologize for the inconvenience. Please try again later.
          </p>
        </div>
      ) : fecthStatus == "success" &&
        (origin == "chatbot" ||
          origin == "favourites" ||
          origin == "filter") ? (
        <div
          className="card"
          style={{
            width: "100rem",
            padding: "50px 30px 50px 30px",
            maxWidth: "1500px",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              margin: "50px 80px 0px 50px",
            }}
          >
            <div style={{ borderRadius: "5px", marginRight: "30px" }}>
              <img
                src={recipe?.image}
                style={{
                  width: "600px",
                  height: "auto",
                  borderRadius: "5px",
                  margin: "0 0 0 45px",
                }}
              />
            </div>

            <div style={{ flex: "1" }}>
              <h2
                style={{
                  fontSize: "40px",
                  fontStyle: "avenir-light",
                  textAlign: "center",
                }}
              >
                {recipe?.title}
              </h2>
              <hr
                style={{
                  width: "50%",
                  margin: "50px auto",
                  border: "1px solid grey",
                }}
              />
              <p
                style={{
                  marginTop: "50px",
                  paddingLeft: "30px",
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{ __html: recipeInfo?.summary }}
              ></p>
            </div>
          </div>

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
            <div
              className="col-sm-12 mb-3 mb-sm-0"
              style={{ marginLeft: "-20px" }}
            >
              <div className="card" style={{ borderColor: "white" }}>
                <div className="card-body" style={{ padding: "20px" }}>
                  <h5 className="card-title">COOKING TIME</h5>
                  <p className="card-text" style={{ fontSize: "20px" }}>
                    {recipeInfo?.readyInMinutes}'
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-sm-12 mb-3 mb-sm-0"
              style={{ marginLeft: "-10px" }}
            >
              <div className="card" style={{ borderColor: "white" }}>
                <div
                  className="card-body ingredient-container"
                  style={{
                    backgroundColor: "#F0F3F6",
                    margin: "20px 0 20px 0",
                  }}
                >
                  <h5 className="card-title" style={{ margin: "10px 0 0 0" }}>
                    INGREDIENTS
                  </h5>
                  <ul
                    style={{
                      margin: "20px 0 0 0",
                      display: "flex",
                      flexWrap: "wrap",
                      listStyleType: "disc",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: "20px",
                    }}
                  >
                    {recipeInfo?.extendedIngredients?.map(
                      (ingredient, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "8px",
                            width: "calc(50% - 20px)",
                            marginRight: "20px",
                          }}
                        >
                          {ingredient.original}
                        </li>
                      )
                    )}
                  </ul>
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
            <div
              className="card"
              style={{ borderColor: "white", padding: "30px 20px 0 0" }}
            >
              <h5 className="card-title" style={{ padding: "0 0 0 16px" }}>
                PREPARATION
              </h5>
              <CookMode />
              <ol className="list-group" style={{ marginTop: "20px" }}>
                {recipeInfo?.analyzedInstructions[0].steps.map(
                  (item, index) => {
                    return (
                      <li
                        className="list-group-item"
                        style={{
                          padding: "5px 0 0 18px",
                          borderColor: "white",
                        }}
                      >
                        {index + 1}. {item.step}
                      </li>
                    );
                  }
                )}
              </ol>
            </div>
            <div
              className="icon-container d-flex"
              style={{
                justifyContent: "flex-end",
                padding: "50px 30px 30px 30px",
              }}
            >
              {store.favourites.find((item) => item.title == recipe.title) ? (
                <svg
                  onClick={() => actions.deleteFavourite(recipeInfo.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="#E84A43"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() =>
                    actions.addFavourites(
                      recipe.title,
                      recipe.image,
                      recipeInfo.id
                    )
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="#E84A43"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
              )}
            </div>
          </div>
        </div>
      ) : (
        // STAN
        <div
          style={{
            width: "100rem",
            // display: "flex",
            background: "white",
            flexDirection: "column",
            padding: "50px 30px 50px 30px",
            maxWidth: "1500px",
            // maxHeight: "1500px",
            alignItems: "center",
            // textAlign: "justify"
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              margin: "50px 40px 0 0",
            }}
          >
            {!loading && (
              <div style={{ borderRadius: "5px", marginRight: "30px" }}>
                <img
                  src={store.imageURL}
                  alt="recipe"
                  style={{
                    width: "600px",
                    height: "auto",
                    borderRadius: "5px",
                    margin: "0 0 0 45px",
                  }}
                />
              </div>
            )}
            <div style={{ flex: "1" }}>
              <h2
                style={{
                  fontSize: "40px",
                  fontStyle: "avenir-light",
                  textAlign: "center",
                }}
              >
                {title}
              </h2>
              <hr
                style={{
                  width: "50%",
                  margin: "50px auto",
                  border: "1px solid grey",
                }}
              />
              <p
                style={{
                  marginTop: "50px",
                  paddingLeft: "30px",
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{ __html: store.summary }}
              ></p>
              {loading ? <p>Loading...</p> : null}
            </div>
          </div>

          <div
            className="row"
            style={{
              maxWidth: "100%",
              margin: "40px 0 0 40px",
              fontSize: "16px",
              textAlign: "initial",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="col-sm-12 mb-3 mb-sm-0"
              style={{ marginLeft: "-20px" }}
            >
              <div className="card" style={{ borderColor: "white" }}>
                <div className="card-body" style={{ padding: "20px" }}>
                  <h5 className="card-title">COOKING TIME</h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "20px", paddingLeft: "0px" }}
                  >
                    {store.cookingTime}'
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-sm-12 mb-3 mb-sm-0"
              style={{ marginLeft: "-10px" }}
            >
              <div className="card" style={{ borderColor: "white" }}>
                <div
                  className="card-body ingredient-container"
                  style={{
                    backgroundColor: "#F0F3F6",
                    margin: "20px 0 20px 0",
                  }}
                >
                  <h5 className="card-title">INGREDIENTS</h5>
                  <ul
                    style={{
                      margin: "20px 0 0 0",
                      display: "flex",
                      flexWrap: "wrap",
                      listStyleType: "disc",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: "20px",
                    }}
                  >
                    {Array.isArray(store.ingredients) &&
                      store.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          style={{
                            marginRight: "20px",
                            marginBottom: "8px",
                            width: "calc(50% - 20px)",
                          }}
                        >
                          {ingredient}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="col-sm-12"
              style={{
                maxWidth: "100%",
                margin: "0",
                textAlign: "initial",
                justifyContent: "flex-start",
                textAlign: "justify",
                marginTop: "10px",
              }}
            >
              <div
                className="card"
                style={{ borderColor: "white", padding: "30px 16px 0 0" }}
              >
                <h5 className="card-title" style={{ padding: "0 0 0 2px" }}>
                  PREPARATION
                </h5>
                <CookMode />
                <ol className="list-group" style={{ marginTop: "20px" }}>
                  {analyzedInstructions.map((step, index) => (
                    <li
                      className="list-group-item"
                      style={{ padding: "5px 0 0 5px", borderColor: "white" }}
                      key={index}
                    >
                      {step.number}. {step.step}
                    </li>
                  ))}
                </ol>
              </div>
              <div
                className="icon-container d-flex"
                style={{
                  justifyContent: "flex-end",
                  padding: "50px 30px 30px 30px",
                }}
              >
                {store.favourites.find((item) => item.title == store.title) ? (
                  <svg
                    onClick={() => actions.deleteFavourite(store.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    fill="#E84A43"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() =>
                      actions.addFavourites(
                        store.title,
                        store.imageURL,
                        store.id
                      )
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    fill="#E84A43"
                    class="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
