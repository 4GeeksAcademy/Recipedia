import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favourites = () => {
const {store, actions} = useContext(Context);
let favouritesList = store.favourites

return(
<div style={{backgroundColor:"#F0F3F6", display:"flex", alignItems:"center", flexDirection:"column", paddingBottom:"40px"}}>
    {favouritesList.map((item, index) => (
        <div className="card mt-5" style={{width: "1000px", height:"280px",}}>
        <div className="row g-0">
            <div className="col-md-4">
            <img src={item.image} className="img-fluid rounded-start" alt="..."style={{width:"700px", height:"280px"}}/>
            </div>
            <div className="col-md-8">
            <div className="card-body" style={{padding:"30px 0 0 50px"}}>
                <h5 className="card-title" style={{fontFamily: "avenir light", fontSize: "28px", color: "#303131"}}>{item.title}</h5>
                <p className="card-text mt-3" style={{fontFamily: "avenir light", fontSize: "20px", color: "#303131"}}>{item.summary} </p>
            </div>
            <div className="icon-container d-flex" style={{justifyContent:"flex-end", marginTop:"100px", paddingRight:"30px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
            </div>
            </div>
        </div>
        </div>
    ))}
</div>
)
}