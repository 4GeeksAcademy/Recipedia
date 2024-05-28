import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import "../../styles/filternavbar.css";
import { Context } from "../store/appContext";

const cuisines = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", 
"European", "French", "German", "Greek", 
"Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Mediterranean", "Mexican", 
"Nordic", "Southern", "Spanish"]

const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan",
"Pescatarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]

const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", 
"Shellfish", "Sesame", "Soy", "Sulfite", "Tree Nut", "Wheat"]

export const FilterCard = () => {
    const { store, actions } = useContext(Context);
    const [showCuisine, setShowCuisine] = useState(false);
    const [showDiets, setShowDiets] = useState(false);
    const [showIntolerances, setShowIntolerances] = useState(false);
    const [selectedDiet, setSelectedDiet] = useState([]);
    const [selectedIntolerance, setSelectedIntolerance] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState([]); 

    const handleShowCuisine = () => {
        setShowCuisine(!showCuisine);
        setShowDiets(false);
        setShowIntolerances(false);
    }

    const handleShowDiets = () => {
        setShowDiets(!showDiets);
        setShowCuisine(false);
        setShowIntolerances(false);
    }

    const handleShowIntolerances = () => {
        setShowIntolerances(!showIntolerances);
        setShowDiets(false);
        setShowCuisine(false);
    }

    const handleSelectedDiet = (diet) => {
       setSelectedDiet([diet])
        console.log(selectedDiet);
        console.log(selectedDiet, selectedIntolerance, selectedCuisine);
    }

    const handleSelectedIntolerance = (intolerance) => {
        setSelectedIntolerance([intolerance])
        console.log(selectedIntolerance);
        console.log(selectedDiet, selectedIntolerance, selectedCuisine);
    }

    const handleSelectedCuisine = (cuisine) => {
        setSelectedCuisine([cuisine])
        console.log(selectedCuisine)
        console.log(selectedDiet, selectedIntolerance, selectedCuisine);
    }

    const handleDeselectCuisine = () => {
        setSelectedCuisine("");
    }
    
    const handleDeselectDiet = () => {
        setSelectedDiet("");
    }
    
    const handleDeselectIntolerance = () => {
        setSelectedIntolerance("");
    }

    return(<div className="card filter-card">
        <div className="buttons-section">
            <button className="btn filter-button" type="button" onClick={handleShowDiets}>Diets</button>
            <button className="btn filter-button" type="button" onClick={handleShowIntolerances}>Intolerances</button>
            <button className="btn filter-button" onClick={handleShowCuisine}>Cuisine</button>
            </div>
        <div className="white-space-section">
        {showDiets && (
                    <ul className="filter-options">
                    <li>
                        <a key="None" 
                        
                        className={`filter-item ${selectedIntolerance === null ? 'active' : ''}`}
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
        {showIntolerances && (
            <ul className="filter-options">
                <li>
                    <a key="None" 
     
                    className={`filter-item ${selectedIntolerance === null ? 'active' : ''}`}
                    onClick={handleDeselectIntolerance}>
                        None
                    </a>
                    </li>
            {intolerances.map((intolerance) => {
                return <li>
                    <a key={intolerance} 
                    
                    className={`filter-item ${selectedIntolerance === intolerance ? 'active' : ''}`}
                    onClick = {() => handleSelectedIntolerance(intolerance)}>
                        {intolerance}
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
            <button className="apply-filters-button" onClick={() => {actions.filterRecipes(selectedDiet, selectedIntolerance, selectedCuisine);}}>Apply Filters</button>
        </div>
    </div>
)}
