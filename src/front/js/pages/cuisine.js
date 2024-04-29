import React, { useEffect, useContext } from "react";
import {Link, useParams} from "react-router-dom";
import { Context } from "../store/appContext";

export const Cuisine = () => {
    const { store, actions } = useContext(Context);
    const {type} = useParams();
    

    useEffect(() => {
        console.log(type)
        actions.getCuisine(type)
    },[type]);
    
    return( 
    <div>
        {store.recipes.map(recipe => <div key={recipe.id}><h4>{recipe.title}</h4></div>)}
    </div>
    )
}

