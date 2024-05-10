import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import background from "../../img/background.png";
import { Link } from "react-router-dom";
import HomepageRecipe from "../component/homepageRecipe";

export const Private = ({ setOrigin }) => {
  const homeRecipe = store.homeRecipe || [];
  const chatbotMessage = store.chatbotMessage; // Flag to track chatbot messages
  const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        }
    }, [store.logged]);

    return (
      <>
        {store.logged ? (
          <Home />
        ) : (
            <Home />
        )}
      </>
    );
  }    


{/* <div className="text-center">
            {store.logged ? (
                <div>
                    <h1>Welcome, {store.user.email}!</h1>
                    <p>This is a protected route.</p>
                </div>
            ) : store.logged == false ? (
                <div>
                    <h1>Unauthorized</h1>
                    <p>You need to be logged in to access this page.</p>
                </div>
            ) : (
                <div>
                    <h1>Authenticating</h1>
                    <p>Please wait while we verify your authentication status.</p>
                </div>
            )}
        </div> */}