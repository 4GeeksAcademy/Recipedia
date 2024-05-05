import React, {useContext} from 'react';
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

const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Shellfish", "Sesame", "Soy", "Sulfite", "Tree Nut", "Wheat"]

export const FilterNavbar = () => {
    const { store, actions } = useContext(Context);
    return (
    <div className="navbar navbar-light bg-light">
    <div className="row">

    <NavLink className="col d-flex justify-content-end" to={`/`}>
        <button className="btn btn-secondary" type="button">Home</button>
    </NavLink>

<div className="dropdown col">
<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filters
    </button>
    <div className="dropdown-menu mega-menu scrollable-menu w-100 mt-0" aria-labelledby="navbarDropdown" style={{ minWidth: "600px" }}>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <div className="menu-section">
                    <h5 className="menu-section-title" style={{leftMargin: "100px"}}>Diets</h5>
                    <ul className="menu-list">
                        {diets.map((diet) => {
                            return <NavLink key={diet} to={`/diet/${diet}`} className="dropdown-item">{diet}</NavLink>}
                        )}
                    </ul>
                </div>
            </div>
            <div className="col-md-3" style={{leftMargin: "10px"}}>
                <div className="menu-section">
                    <h5 className="menu-section-title" style={{leftMargin: "10px"}}>Intolerances</h5>
                    <ul className="menu-list">
                        {intolerances.map((intolerance) => {
                            return <NavLink key={intolerance} to={`/intolerances/${intolerance}`} className="dropdown-item">{intolerance}</NavLink>}
                        )}
                    </ul>
                </div>
            </div>
            <div className="col-md-3" style={{leftMargin: "10px"}}>
                <div className="menu-section">
                    <h5 className="menu-section-title" style={{leftMargin: "10px"}}>Cuisines</h5>
                    <ul className="menu-list">
                        {cuisines.map((cuisine) => {
                            return <NavLink key={cuisine} to={`/cuisine/${cuisine}`} className="dropdown-item">{cuisine}</NavLink>}
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

    {/* <button onClick= {actions.getTwoThingsTest("egg", "vegetarian", "african")}>Hello</button> */}
    </div>
</div>)}


