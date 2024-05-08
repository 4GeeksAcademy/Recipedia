import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import HomepageRecipe from "../component/homepageRecipe";
import background from "/workspaces/Recipedia/src/front/img/background.png";

export const Home = () => {
    const { store, actions } = useContext(Context);

    const homeRecipe = store.homeRecipe || [];
    const chatbotMessage = store.chatbotMessage; // Flag to track chatbot messages

    console.log("this is the homerecipe", homeRecipe);

    return (
        <div 
            className="recipes-container" 
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '94.3vh',
                paddingTop: '20px'
            }}
        >
            {/* Render products only if there are products and chatbot message hasn't been sent */}
            {!chatbotMessage && homeRecipe.map((recipe, index) => (
                <HomepageRecipe key={index} recipe={recipe} />
            ))}
        </div>
    );
};

export default Home;
