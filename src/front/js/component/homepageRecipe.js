import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "/workspaces/Recipedia/src/front/js/store/appContext.js";


const HomepageRecipe = ({ recipe }) => {
    const { actions, store } = useContext(Context);
    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const handleAddFavorite = () => {
    //     actions.addFavorites(person.name, person.uid, 'character');
    //     setDropdownOpen(true);
    // };

    return (
        // <div style={{ display: 'inline-block', margin: '0 5px', marginBottom: '20px', width: 'calc(33.33% - 10px)', height: '250px', overflow: 'hidden', fontFamily:"avenir-light" }}>
        //   <div style={{ maxHeight: '150px', maxWidth: '100%', width: 'auto', marginBottom: '10px', overflow: 'hidden' }}>
        //     <Link to={`/recipe/${recipe.title}`}>
        //       <img src={recipe.image} style={{ height: '200px', width: 'auto' }} alt="Recipe" />
        //     </Link>
        //   </div>
        //   <h5 style={{ textAlign: 'center', fontSize: '20px', color:"white"}}>{recipe.title}</h5>
        // </div>
        <div className="card" style={{ display: 'inline-block', margin: '0 5px', marginBottom: '20px', width: 'calc(33.33% - 10px)', height: '250px', overflow: 'hidden', border: '1px solid #ccc' }}>
            <div className="card-body" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ maxHeight: '150px', maxWidth: '100%', width: 'auto', marginBottom: '10px', overflow: 'hidden' }}>
                <Link to={`/recipe/${recipe.title}`}>
                    <img src={recipe.image} style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto' }} alt="Recipe"></img>
                    </Link>
                </div>
                <h5 className="card-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', fontSize: '20px', maxWidth: '80%' }}>{recipe.title}</h5>
                
                {/* Add any other content you want here */}
            </div>
        </div>
      );
    }
export default HomepageRecipe;