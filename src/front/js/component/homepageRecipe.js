import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Tooltip } from "react-tooltip";

const HomepageRecipe = ({ recipe, setOrigin }) => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("pending");

  useEffect(() => {
    const authentication = async () => {
      let result = await actions.verifyAuthToken();
      if (result) {
        setAuthStatus("granted");
      } else {
        setAuthStatus("denied");
      }
    };
    authentication();
  }, []);

  return (
    <div
      style={{
        display: "inline-block",
        width: "15vw",
        height: "40vh",
        margin: "30px",
        overflow: "hidden",
        color: "white",
        fontFamily: "avenir-light",
        borderRadius: "10px",
        maxWidth: "100%",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={recipe.image}
            style={{
              maxHeight: "25vh",
              maxWidth: "100%",
              width: "auto",
              borderRadius: "10px",
              marginTop: "16px",
              cursor: "pointer",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            alt="Recipe"
            onClick={() => {
              if (store.filterStatus) {
                setOrigin("filter");
              } else {
                setOrigin("home");
              }

              navigate("/recipe/" + recipe.title);
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)";
            }}
          />
        </div>
        <div
          className="titleandicon-container d-flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <h5
            style={{
              paddingLeft: "50px",
              textAlign: "center",
              fontSize: "30px",
              maxWidth: "80%",
              height: "3em",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            <strong>{recipe.title}</strong>
          </h5>
          {authStatus === "granted" ? (
            store.favourites.find((item) => item.title === recipe.title) ? (
              <svg
                onClick={() => actions.deleteFavourite(recipe.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#E84A43"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            ) : (
              <svg
                onClick={() =>
                  actions.addFavourites(recipe.title, recipe.image, recipe.id)
                }
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#E84A43"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            )
          ) : (
            <>
              <svg
                id="notClickable"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#E84A43"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
              <Tooltip
                anchorSelect="#notClickable"
                style={{ fontSize: "20px" }}
              >
                Sign in to save your favourite recipes!
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomepageRecipe;
