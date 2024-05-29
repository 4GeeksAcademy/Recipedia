import React, {useContext, useState} from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/filternavbar.css";
import { Context } from "../store/appContext";

const cuisines = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", 
"European", "French", "German", "Greek", 
"Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Mediterranean", "Mexican", 
"Nordic", "Southern", "Spanish"]

const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan",
"Pescatarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]

const ingredients = ["Dairy", "Egg", "Sugar", "Grain", "Peanut", "Seafood", 
"Shellfish", "Sesame", "Soy", "Potato", "Tomato", "Wheat", "Chicken", "Beef", "Pork", "Lamb", "Mushroom"]

export const FilterCard = () => {
    const { store, actions } = useContext(Context);
    const [showCuisine, setShowCuisine] = useState(false);
    const [showDiets, setShowDiets] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    const [selectedDiet, setSelectedDiet] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState([]); 

    const navigate = useNavigate();

    const handleShowCuisine = () => {
        setShowCuisine(!showCuisine);
        setShowDiets(false);
        setShowIngredients(false);
    }

    const handleShowDiets = () => {
        setShowDiets(!showDiets);
        setShowCuisine(false);
        setShowIngredientss(false);
    }

    const handleShowIngredients = () => {
        setShowIngredients(!showIngredients);
        setShowDiets(false);
        setShowCuisine(false);
    }

    const handleSelectedDiet = (diet) => {
       setSelectedDiet([diet])
        console.log(selectedDiet);
        console.log(selectedDiet, selectedIngredient, selectedCuisine);
    }

    const handleSelectedIngredient = (ingredient) => {
        setSelectedIngredient([ingredient])
        console.log(selectedIngredient);
        console.log(selectedDiet, selectedIngredient, selectedCuisine);
    }

    const handleSelectedCuisine = (cuisine) => {
        setSelectedCuisine([cuisine])
        console.log(selectedCuisine)
        console.log(selectedDiet, selectedIngredient, selectedCuisine);
    }

    const handleDeselectCuisine = () => {
        setSelectedCuisine("");
        console.log(selectedDiet, selectedIngredient, selectedCuisine);
    }
    
    const handleDeselectDiet = () => {
        setSelectedDiet("");
        console.log(selectedDiet, selectedIngredient, selectedCuisine);
    }
    
    const handleDeselectIngredient = () => {
        setSelectedIngredient("");
        console.log(selectedDiet, selectedIngredient, selectedCuisine);
    }

    const clearAllFilters = () => {
        setSelectedCuisine("");
        setSelectedDiet("");
        setSelectedIngredient("");
        console.log(selectedDiet, selectedIngredient, selectedCuisine);
    }

    return(<div className="card filter-card">
        <div className="buttons-section">
            <button className="btn filter-button" type="button" onClick={handleShowDiets}>Diets</button>
            <button className="btn filter-button" type="button" onClick={handleShowIngredients}>Exclude Ingredients</button>
            <button className="btn filter-button" onClick={handleShowCuisine}>Cuisine</button>
            </div>
        <div className="white-space-section">
        {showDiets && (
                    <ul className="filter-options">
                    <li>
                        <a key="None" 
                        
                        className={`filter-item ${selectedDiet === null ? 'active' : ''}`}
                        onClick={handleDeselectDiet}>
                            None
                        </a>
                    </li>
                    {diets.map((diet) => {
                        return <li>
                            <a key={diet} 
                            
                            className={`filter-item ${selectedDiet === diet ? 'active' : ''}`}
                            onClick={() => handleSelectedDiet(diet)}>
                                {diet}
                            </a>
                        </li>
                        }
                    )}
                </ul>
                )}
        {showIngredients && (
            <ul className="filter-options">
                <li>
                    <a key="None" 
     
                    className={`filter-item ${selectedIngredient === null ? 'active' : ''}`}
                    onClick={handleDeselectIngredient}>
                        None
                    </a>
                    </li>
            {ingredients.map((ingredient) => {
                return <li>
                    <a key={ingredient} 
                    
                    className={`filter-item ${selectedIngredient === ingredient ? 'active' : ''}`}
                    onClick = {() => handleSelectedIngredient(ingredient)}>
                        {ingredient}
                    </a>
                </li>
                }
            )}
        </ul>
                )}
        {showCuisine && (
                    <ul className="filter-options">
                    <li>
                        <a key="None" 
                        
                        className={`filter-item ${selectedCuisine === null ? 'active' : ''}`}
                        onClick={handleDeselectCuisine}>
                            None
                        </a>
                    </li>
                    {cuisines.map((cuisine) => {
                        return <li>
                            <a key={cuisine} 
                            
                            className={`filter-item ${selectedCuisine === cuisine ? 'active' : ''}`}
                            onClick={() => handleSelectedCuisine(cuisine)}>
                                {cuisine}
                            </a>
                        </li>
                        }
                    )}
                </ul>
                )}
            <button className="apply-filters-button" onClick={() => {actions.filterRecipes(selectedDiet, selectedIngredient, selectedCuisine); navigate("/"); clearAllFilters()}}>Apply Filters</button>
        </div>
    </div>
)}