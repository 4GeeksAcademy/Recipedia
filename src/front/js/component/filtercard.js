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

export const FilterCard = ({setShowFilterCard}) => {
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
        setShowIngredients(false);
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

    return(<div className="card filter-card" style={{margin:"18px 0 0 45px", border: "1px solid grey",
            borderRadius: "5px",}}>
        <div className="buttons-section">
            <button className="btn filter-button" type="button" onClick={handleShowDiets} style={{border: "1px solid grey",
            borderRadius: "5px",}}>Diets</button>
            <button className="btn filter-button" type="button" onClick={handleShowIngredients} style={{border: "1px solid grey",
            borderRadius: "5px",}}>Exclude Ingredients</button>
            <button className="btn filter-button" onClick={handleShowCuisine} style={{border: "1px solid grey",
            borderRadius: "5px",}}>Cuisine</button>
            </div>
        <div className="white-space-section">
        {showDiets && (
                    <ul className="filter-options" style={{margin:"20px 0 0 30px",}}>
                    <li type="button" style={{fontSize:"18px"}}>
                    <input type="checkbox" key="None" 
                        style={{paddingRight:"10px",}}
                        className={`filter-item ${selectedDiet === null ? 'active' : ''}`}
                        onClick={handleDeselectDiet} />
                        
                        {`\u00A0\u00A0None`}
                     </li>
                    {diets.map((diet) => {
                        return <li style={{paddingRight:"10px", fontSize:"18px"}} type="button">
                            <input type="checkbox" key={diet}                     
                            className={`filter-item ${selectedDiet === diet ? 'active' : ''}`}
                            onClick={() => handleSelectedDiet(diet)} />
                            
                            {`\u00A0\u00A0${diet}`}
                            
                        </li>
                        }
                    )}
                </ul>
                )}
        {showIngredients && (
            <ul className="filter-options" style={{margin:"20px 0 0 30px",}}>
                <li type="button" style={{fontSize:"18px"}}>
                <input type="checkbox" key="None" 
     
                    className={`filter-item ${selectedIngredient === null ? 'active' : ''}`}
                    onClick={handleDeselectIngredient}/>
                        {`\u00A0\u00A0None`}
                    </li>
            {ingredients.map((ingredient) => {
                return <li type="button" style={{fontSize:"18px"}}>
                    <input type="checkbox" key={ingredient} 
                    
                    className={`filter-item ${selectedIngredient === ingredient ? 'active' : ''}`}
                    onClick = {() => handleSelectedIngredient(ingredient)}/>
                        {`\u00A0\u00A0${ingredient}`}
                    
                </li>
                }
            )}
        </ul>
                )}
        {showCuisine && (
                    <ul className="filter-options" style={{margin:"20px 0 0 30px",}}>
                    <li type="button" style={{fontSize:"18px",}}>
                    <input type="checkbox" key="None" 
                        
                        className={`filter-item ${selectedCuisine === null ? 'active' : ''}`}
                        onClick={handleDeselectCuisine}/>
                            {`\u00A0\u00A0None`}
                    
                    </li>
                    {cuisines.map((cuisine) => {
                        return <li type="button" style={{fontSize:"18px"}}>
                            <input type="checkbox" key={cuisine} 
                            
                            className={`filter-item ${selectedCuisine === cuisine ? 'active' : ''}`}
                            onClick={() => handleSelectedCuisine(cuisine)}/>
                                {`\u00A0\u00A0${cuisine}`}
                           
                        </li>
                        }
                    )}
                </ul>
                )}
            <button className="apply-filters-button" style={{ backgroundColor: "#273A4E", color: "white", borderRadius: '5px', display:"flex", alignContent:"center", fontSize:"18px", marginBottom:"5px"}} onClick={() => {actions.filterRecipes(selectedDiet, selectedIngredient, selectedCuisine); setShowFilterCard(false); navigate("/"); clearAllFilters()}}>Apply Filters</button>
        </div>
    </div>
)}