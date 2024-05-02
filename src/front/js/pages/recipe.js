import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Recipe = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [recipe, setRecipe] = useState({});
	useEffect(() => {
		setRecipe(store.recentlyFetchedRecipes.find((item) => item.title==params.title))
	}, []);

	return (
		<div className="jumbotron">
			<div className="card" style={{width: "18rem"}}>
			<button onClick={()=>console.log(recipe)}>Click here!</button>
			<img src={recipe.image} className="card-img-top"/>
			<div className="card-body">
			<h5 className="card-title">{recipe.title}</h5>
			<p className="card-text">{recipe.info?.instructions}</p>
			</div>
			</div>
		</div>
	);
};