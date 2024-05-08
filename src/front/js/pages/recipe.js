import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Recipe = () => {
    const { store, actions } = useContext(Context);
    const { title } = useParams();
    const [analyzedInstructions, setAnalyzedInstructions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const randomRecipe = store.homeRecipe.find(recipe => recipe.title === title);
        if (randomRecipe) {
            actions.getRecipeDetails(randomRecipe.id)
            .then(data => {
                if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
                    setAnalyzedInstructions(data.analyzedInstructions[0].steps);
                } else {
                    setAnalyzedInstructions([]);
                }
                setLoading(false); 
            })
            .catch(error => console.error("Error fetching recipe details!: ", error));
        }   
    }, [title]); 

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            border: "1px solid", 
            maxWidth: "600px", 
            margin: "0 auto", 
            padding: "20px", 
        }}>
            <h2>{title}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <img src={store.imageURL} alt="recipe" />
                </div>
            )}
            <p>Instructions: {store.instructions} </p>
            <p>Cooking time: {store.cookingTime} minutes</p>
            <p>Ingredients: {store.ingredients}</p>
            <p>Preparation</p>
            <ul>
                {analyzedInstructions.map((step, index) => (
                    <li key={index}>
                        {step.step}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recipe;
