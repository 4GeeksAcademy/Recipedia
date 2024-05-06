import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Recipe = () => {
    const { store, actions } = useContext(Context);
    const { title } = useParams();
    const [analyzedInstructions, setAnalyzedInstructions] = useState([]);

    useEffect(() => {
       const randomRecipe = store.homeRecipe.find(recipe => recipe.title === title)
       if (randomRecipe){
        actions.getRecipeDetails(randomRecipe.id)
        .then(data => {
            if (data.analyzedInstructions && data.analyzedInstructions.length > 0){
                setAnalyzedInstructions(data.analyzedInstructions[0].steps)
            } else {
                setAnalyzedInstructions([])
            }
        })
        .catch(error => console.error("Error fetching recipe details!: ", error))
        }   
       }, []);
       console.log("L<OLOLOL", store.imageURL)

    return (
        <div>
            <h2>{title}</h2>
            <div>
                <img src={store.imageURL} alt="recipe"/>
            </div>
            <p>Instructions: {store.instructions}</p>
            <p>Cooking time: {store.cookingTime}</p>
            <p>Ingredients: {store.ingredients}</p>
            <p>Analyzed Instructions:</p>
            <ul>
                {analyzedInstructions.map((step, index) => (
                    <li key={index}>
                        <strong>Step {step.number}:</strong> {step.step}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recipe;
