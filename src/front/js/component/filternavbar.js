import React from 'react';
import {NavLink} from 'react-router-dom';
import "../../styles/filternavbar.css";
import { Intolerances } from '../pages/intolerances';

const cuisines = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", 
"Eastern European", "European", "French", "German", "Greek", 
"Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", 
"Latin American", "Mediterranean", "Mexican", "Middle Eastern", 
"Nordic", "Southern", "Spanish", "Thai", "Vietnamese"]

const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan",
"Pescatarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]

const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Shellfish", "Sesame", "Soy", "Sulfite", "Tree Nut", "Wheat"]

export const FilterNavbar = () => {
    return (<div className="navbar navbar-light bg-light">
    <div className="row">
    <div className="dropdown col">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Diet
        </button>
        <div className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton" style={{maxHeight:"200px", overflowY:"auto"}}>
            {diets.map((diet) => {
                return <NavLink key={diet} to={`/diet/${diet}`} className="dropdown-item">{diet}</NavLink>}
            )}
        </div>
    </div>

    <div className="dropdown col">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Cuisines
        </button>
        <div className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
            {cuisines.map((cuisine) => {
           return <NavLink key={cuisine} to={`/cuisine/${cuisine}`} className="dropdown-item">{cuisine}</NavLink>}
        )}
        </div>
    </div>

    <div className="dropdown col">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Intolerances
        </button>
        <div className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
        {intolerances.map((intolerance) => {
           return <NavLink key={intolerance} to={`/intolerances/${intolerance}`} className="dropdown-item">{intolerance}</NavLink>}
        )}
        </div>
    </div>

    <NavLink className="col d-flex justify-content-end" to={`/`}>
        <button className="btn btn-secondary" type="button">Home</button>
    </NavLink>
    </div>
    </div>)}


