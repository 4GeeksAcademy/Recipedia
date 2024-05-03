import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import background from "../../img/background.png"

export const Recipe = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [recipe, setRecipe] = useState({});
	const [didItRun, setDidItRun] = useState(false);
	// useEffect(() => {
	// 	setRecipe(store.recentlyFetchedRecipes.find((item) => item.title==params.title))
	// }, []);
	// useEffect(() => {
	// 	const getInfo = async () => {
	// 		setDidItRun(true)
	// 		let parts = recipe.link.split("/")
	// 		let recipeString = parts[parts.length-1]
	// 		let recipeStringParts = recipeString.split("-")
	// 		let recipeId = recipeStringParts[recipeStringParts.length-1]
	// 		let resp = await fetch ("https://api.spoonacular.com/recipes/"+recipeId+"/information?apiKey=" +
	// 		process.env.SPOONACULAR_API_KEY
	// 	)
	// 		let info = await resp.json();
	// 		setRecipe({...recipe,"info":info})
	// 		setRecipe({...recipe,"id":recipeId})
	// 	}
	// 	if (didItRun==false){
	// 		getInfo();
	// 	}
	// }, [recipe]);

	return (
		<div className="jumbotron text-center mt-5" style={{ backgroundImage: `url(${background})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", paddingBottom: "20px", minHeight: "700px"  }}>
			<div className="card align-item-center" style={{width: "18rem"}}>
			<button onClick={()=>console.log(recipe)}>Click here!</button>
			<img src={background}/> 
			{/* <img src={recipe.image} className="card-img-top"/> */}
			<div className="card-body">
			<h5 className="card-title">Pesto di questo{recipe.title}</h5>
			<p className="card-text">{recipe.info?.instructions}</p>
			</div>
			</div>
		</div>
	);
};