import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import HomepageRecipe from "../component/homepageRecipe";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const homeRecipe = store.homeRecipe || [];

	console.log("this is the homerecipe", homeRecipe)

	return (
		<div className="recipes-container">
            {/* Map over the homeRecipe array and render a HomepageRecipe component for each recipe */}
            {homeRecipe.map((recipe, index) => (
                <HomepageRecipe key={index} recipe={recipe} />
            ))}
        </div>
	);
};

export default Home;