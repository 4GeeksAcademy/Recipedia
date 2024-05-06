import React, { useEffect, useContext } from "react";
import {Link, useParams, useLocation} from "react-router-dom";
import { Context } from "../store/appContext";

export const FilteredRecipes = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    
    const diet = searchParams.get('diet');
    const intolerance = searchParams.get('intolerance');
    const cuisine = searchParams.get('cuisine');

    useEffect(() => {
        console.log(intolerance, diet, cuisine)
        actions.filterRecipes(intolerance, diet, cuisine)
    },[intolerance, diet, cuisine]);
    
    return( 
    <div>
        {store.recipes.map(recipe => <div key={recipe.id}><h4>{recipe.title}</h4></div>)}
    </div>
    )
}
