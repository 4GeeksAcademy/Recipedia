import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import background from "../../img/background.png";
import { Link } from "react-router-dom";
import HomepageRecipe from "../component/homepageRecipe";

export const Home = ({ setOrigin }) => {
  const { store, actions } = useContext(Context);

  const homeRecipe = store.homeRecipe || [];
  const chatbotMessage = store.chatbotMessage; // Flag to track chatbot messages

  console.log("this is the homerecipe", homeRecipe);
  return (
    <div className="text-center mt-5" style={{ minHeight: "100vh"}}>
      <img src={background} style={{ width: "100%", position:"absolute", zIndex:"-1", left:"0"}} alt="Background" />
      {!chatbotMessage &&
        homeRecipe.map((recipe, index) => (
          <HomepageRecipe key={index} recipe={recipe} setOrigin={setOrigin} />
        ))}
    </div>
  );
  // return (
  //     <div
  //         className="recipes-container"
  //         style={{
  //             backgroundImage: `url(${background})`,
  //             backgroundSize: 'cover',
  //             backgroundPosition: 'center',
  //             minHeight: '94.3vh',
  //             paddingTop: '20px'
  //         }}
  //     >
  //         {/* Render products only if there are products and chatbot message hasn't been sent */}
  //         {!chatbotMessage && homeRecipe.map((recipe, index) => (
  //             <HomepageRecipe key={index} recipe={recipe} />
  //         ))}
  //     </div>
  // );
};

export default Home;
