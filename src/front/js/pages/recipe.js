import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Recipe = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	let recipe = store.recentlyFetchedRecipes.find((item) => item.title==params.title)

	return (
		<div className="jumbotron">
			<div className="card" style={{width: "18rem"}}>
			<img src="..." className="card-img-top" alt="..."/>
			<div className="card-body">
			<h5 className="card-title">{recipe?.title}</h5>
			<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
			</div>
		</div>
	);
};