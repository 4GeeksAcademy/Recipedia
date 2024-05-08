import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import "../../styles/filternavbar.css";
import { Context } from "../store/appContext";
import { Intolerances } from '../pages/intolerances';

const cuisines = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", 
"Eastern European", "European", "French", "German", "Greek", 
"Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", 
"Latin American", "Mediterranean", "Mexican", "Middle Eastern", 
"Nordic", "Southern", "Spanish", "Thai", "Vietnamese"]

const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan",
"Pescatarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]

const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", 
"Shellfish", "Sesame", "Soy", "Sulfite", "Tree Nut", "Wheat"]

export const FilterNavbar = () => {
    const { store, actions } = useContext(Context);
    const [selectedDiet, setSelectedDiet] = useState([]);
    const [selectedIntolerance, setSelectedIntolerance] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState([]); 

    const handleSelectedDiet = (diet) => {
        setSelectedDiet([diet])
        console.log(selectedDiet);
    }

    const handleSelectedIntolerance = (intolerance) => {
        setSelectedIntolerance([intolerance]);
        console.log(selectedIntolerance);
    }

    const handleSelectedCuisine = (cuisine) => {
        setSelectedCuisine([cuisine]);
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

    return (
    <div className="navbar navbar-light bg-light">
    <div className="row">

    <NavLink className="col d-flex justify-content-end" to={`/`}>
        <button className="btn btn-secondary" type="button">Home</button>
    </NavLink>
    <NavLink className="col d-flex justify-content-end" to={`/signup`}>
        <button className="btn btn-secondary" type="button">Signup</button>
    </NavLink>
    {!store.token ? (
    
    <NavLink className="col d-flex justify-content-end" to={`/login`}>
        <button className="btn btn-secondary" type="button">Login</button>
    </NavLink> ) : (
        <button className="btn btn-secondary" onClick = {actions.logout} type="button">Logout</button>)
    }
<div className="dropdown col">
<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filters
    </button>
    <div className="dropdown-menu mega-menu scrollable-menu w-100 mt-0" aria-labelledby="navbarDropdown" style={{ minWidth: "600px" }}>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <div className="menu-section">
                    <h5 className="menu-section-title">Diets</h5>
                    <ul className="menu-list">
                        <NavLink key="None" 
                        to={`/filter-recipes?diet=&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=${encodeURIComponent(selectedCuisine)}`}
                        className={`dropdown-item ${selectedIntolerance === null ? 'active' : ''}`}
                        onClick={handleDeselectDiet}>
                            None
                        </NavLink>

                        {diets.map((diet) => {
                            return <NavLink key={diet} 
                            to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=&cuisine=${encodeURIComponent(selectedCuisine)}`} 
                            className={`dropdown-item ${selectedDiet === diet ? 'active' : ''}`}
                            onClick={() => handleSelectedDiet(diet)}>
                                {diet}
                            </NavLink>
                        }
                        )}
                    </ul>
                </div>
            </div>
            <div className="col-md-3">
                <div className="menu-section">
                    <h5 className="menu-section-title">Intolerances</h5>
                    <ul className="menu-list">
                        <NavLink key="None" 
                        to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=&cuisine=${encodeURIComponent(selectedCuisine)}`} 
                        className={`dropdown-item ${selectedIntolerance === null ? 'active' : ''}`}
                        onClick={handleDeselectIntolerance}>
                            None
                        </NavLink>
                        {intolerances.map((intolerance) => {
                            return <NavLink key={intolerance} 
                            to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=${encodeURIComponent(selectedCuisine)}`} 
                            className={`dropdown-item ${selectedIntolerance === intolerance ? 'active' : ''}`}
                            onClick = {() => handleSelectedIntolerance(intolerance)}>
                                {intolerance}
                                </NavLink>
                            }
                        )}
                    </ul>
                </div>
            </div>
            <div className="col-md-3" style={{leftMargin: "10px"}}>
                <div className="menu-section">
                    <h5 className="menu-section-title" style={{leftMargin: "10px"}}>Cuisines</h5>
                    <ul className="menu-list">
                        <NavLink key="None" 
                        to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=`} 
                        className={`dropdown-item ${selectedCuisine === null ? 'active' : ''}`}
                        onClick={handleDeselectCuisine}>
                            None
                        </NavLink>
                        {cuisines.map((cuisine) => {
                            return <NavLink key={cuisine} 
                            to={`/filter-recipes?diet=${encodeURIComponent(selectedDiet)}&intolerance=${encodeURIComponent(selectedIntolerance)}&cuisine=${encodeURIComponent(cuisine)}`} 
                            className={`dropdown-item ${selectedCuisine === cuisine ? 'active' : ''}`}
                            onClick={() => handleSelectedCuisine(cuisine)}>
                                {cuisine}
                                </NavLink>
                            }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

    </div>
</div>)}


