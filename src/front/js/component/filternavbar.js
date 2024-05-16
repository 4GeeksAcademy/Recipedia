import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import "../../styles/filternavbar.css";
import { Context } from "../store/appContext";

const cuisines = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", 
"Eastern European", "European", "French", "German", "Greek", 
"Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", 
"Latin American", "Mediterranean", "Mexican", "Middle Eastern", 
"Nordic", "Southern", "Spanish", "Thai", "Vietnamese"]

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
    }

    const handleSelectedIntolerance = (intolerance) => {
        setSelectedIntolerance([intolerance])
        console.log(selectedIntolerance);
    }

    const handleSelectedCuisine = (cuisine) => {
        setSelectedCuisine([cuisine])
        console.log(selectedCuisine)
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
                        <NavLink key="None" 
                        to={`/filter-recipes?diet=&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=${encodeURIComponent(selectedCuisine)}`}
                        className={`filter-item ${selectedIntolerance === null ? 'active' : ''}`}
                        onClick={handleDeselectDiet}>
                            None
                        </NavLink>
                    </li>
                    {diets.map((diet) => {
                        return <li>
                            <NavLink key={diet} 
                            to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=${encodeURIComponent(selectedIntolerance)}${encodeURIComponent(selectedCuisine)}`} 
                            className={`filter-item ${selectedDiet === diet ? 'active' : ''}`}
                            onClick={() => handleSelectedDiet(diet)}>
                                {diet}
                            </NavLink>
                        </li>
                        }
                    )}
                </ul>
                )}
        {showIntolerances && (
            <ul className="filter-options">
                <li>
                    <NavLink key="None" 
                    to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=&cuisine=${encodeURIComponent(selectedCuisine)}`} 
                    className={`filter-item ${selectedIntolerance === null ? 'active' : ''}`}
                    onClick={handleDeselectIntolerance}>
                        None
                    </NavLink>
                    </li>
            {intolerances.map((intolerance) => {
                return <li>
                    <NavLink key={intolerance} 
                    to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=${encodeURIComponent(selectedCuisine)}`} 
                    className={`filter-item ${selectedIntolerance === intolerance ? 'active' : ''}`}
                    onClick = {() => handleSelectedIntolerance(intolerance)}>
                        {intolerance}
                    </NavLink>
                </li>
                }
            )}
        </ul>
                )}
        {showCuisine && (
                    <ul className="filter-options">
                    <li>
                        <NavLink key="None" 
                        to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=`}
                        className={`filter-item ${selectedCuisine === null ? 'active' : ''}`}
                        onClick={handleDeselectCuisine}>
                            None
                        </NavLink>
                    </li>
                    {cuisines.map((cuisine) => {
                        return <li>
                            <NavLink key={cuisine} 
                            to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=${encodeURIComponent(selectedCuisine)}`} 
                            className={`filter-item ${selectedCuisine === cuisine ? 'active' : ''}`}
                            onClick={() => handleSelectedCuisine(cuisine)}>
                                {cuisine}
                            </NavLink>
                        </li>
                        }
                    )}
                </ul>
                )}
        </div>
    </div>
)}

export const FilterNavbar = () => {
    const { store, actions } = useContext(Context);
    const [showFilterCard, setShowFilterCard] = useState(false);

    const toggleFilterCard = () => {
        setShowFilterCard(!showFilterCard);
    };

    return (
    <div className="navbar navbar-light bg-light">
        <div className="col-6">
        <button className="btn btn-secondary" type="button" onClick={toggleFilterCard}>Filters</button>

    {showFilterCard && 
    <div className="col">
        <FilterCard />
    </div>
    }
    

            </div>
        </div>
)}


