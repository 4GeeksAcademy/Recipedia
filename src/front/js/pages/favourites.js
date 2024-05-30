import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import background from "../../img/background.png";

export const Favourites = ({ showChatBot, setOrigin }) => {
  const { store, actions } = useContext(Context);
  let favouritesList = store.favourites;
  const [authStatus, setAuthStatus] = useState("pending");
  const navigate = useNavigate();

  useEffect(() => {
    const authentication = async () => {
      let result = await actions.verifyAuthToken();
      if (result) {
        setAuthStatus("granted");
        actions.getFavourites();
      } else {
        setAuthStatus("denied");
      }
    };
    authentication();
  }, []);

  useEffect(() => {
    actions.addRecipes(favouritesList);
  }, [favouritesList]);

  return (
    <div
      style={{
        backgroundColor: showChatBot == false ? "#F0F3F6" : "",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: "40px",
      }}
    >
      {authStatus == "pending" ? (
        <div style={{ fontSize: "40px" }}>
          Please wait while we authenticate you.
        </div>
      ) : authStatus == "denied" ? (
        <div className="bg-white text-center p-5 h-25">
          <h2 className="text-danger" style={{ fontSize: "40px" }}>
            Oops! You don't have access to this area.
          </h2>
          <p className="text-muted" style={{ fontSize: "40px" }}>
            Please <Link to="/login">login</Link> first.
          </p>
        </div>
      ) : authStatus == "granted" ? (
        <div>
          {showChatBot == false ? (
            ""
          ) : (
            <img
              className="mt-5"
              src={background}
              style={{
                width: "100%",
                position: "absolute",
                zIndex: "0",
                left: "0",
              }}
              alt="Background"
            />
          )}
          {favouritesList.map((item, index) => (
            <div
              className={
                "card mt-5 " + (showChatBot == false ? "" : "invisible")
              }
              style={{ width: "1000px" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    onClick={() => {
                      setOrigin("favourites");
                      navigate("/recipe/" + item.title);
                    }}
                    style={{ width: "700px", height: "280px" }}
                  />
                </div>
                <div
                  className="col-md-8 d-flex"
                  style={{ flexDirection: "column" }}
                >
                  <div
                    className="card-body"
                    style={{ padding: "20px 0 0 50px" }}
                  >
                    <h5
                      className="card-title"
                      style={{
                        fontFamily: "avenir light",
                        fontSize: "28px",
                        color: "#303131",
                        margin: "20px 20px 0 0",
                      }}
                    >
                      {item.title}
                    </h5>
                    <p
                      className="card-text mt-3"
                      style={{
                        fontFamily: "avenir light",
                        fontSize: "20px",
                        color: "#303131",
                        textAlign: "justify",
                        width: "550px",
                      }}
                    >
                      {item.summary}{" "}
                    </p>
                  </div>
                  <div
                    className="icon-container d-flex"
                    style={{
                      justifyContent: "flex-end",
                      paddingRight: "30px",
                      paddingBottom: "30px",
                    }}
                  >
                    {store.favourites.find(
                      (item) => item.title == item.title
                    ) ? (
                      <svg
                        onClick={() => actions.deleteFavourite(item.api_id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                            item.title,
                            item.image,
                            item.api_id
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
          ))}
        </div>
      ) : (
        <div className="bg-white text-center p-5 h-25">
          <h2 className="text-danger" style={{ fontSize: "40px" }}>
            Oops! An error accurred.
          </h2>
          <p className="text-muted" style={{ fontSize: "40px" }}>
            Please try again.
          </p>
        </div>
      )}
    </div>
  );
};
