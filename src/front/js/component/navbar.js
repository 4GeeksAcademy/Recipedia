import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChatBot } from "./chatbot";
import recipedia from "../../img/recipedia.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Navbar = ({ setOrigin, showChatBot, setShowChatBot }) => {
  const navigate = useNavigate();
  console.log(useNavigate);
  const { store, actions } = useContext(Context);
  const [showCredentialsVersion, setShowCredentialsVersion] = useState(false);

  const location = useLocation();
  
  useEffect(() => { 
    console.log("Current pathname:", location.pathname);
    // console.log("locationpathname:",`/recipe/${title}` );


    setShowChatBot(false)
    if (location.pathname === `/login` || location.pathname === `/signup` || location.pathname === `/manageaccount` || location.pathname.includes("/recipe/")) {
      setShowCredentialsVersion(true);
    } else {
      setShowCredentialsVersion(false);
    }
  }, [location]);  

  return (
    <nav
      className="navbar navbarCustom d-flex"
      style={{
        width: "90%",
        marginBottom: "-30px",
        fontFamily: "avenir-light",
        color: "#303131",
      }}
    >
      <div
        className="navbar navbarCustom col-12"
        style={{ justifyContent: "center" }}
      >
        {" "}
        <a href="/">
          <img
            src={recipedia}
            style={{ width: "270px", height: "auto", marginLeft: "-110px" }}
            alt="recipedia"
          />
        </a>
      </div>
      <div className="ml-auto d-flex justify-content-start">
        <span className={"navbar navbarCustom m-5 "+(showCredentialsVersion ? "invisible" : "")}>Filters</span>
        <span 
          className={"navbar navbarCustom "+(showCredentialsVersion ? "invisible" : "")}
          onClick={() => setShowChatBot(!showChatBot)}
        >
          Chatbot
        </span>
      </div>
      <div className="ml-auto me-3" style={{fontFamily: "avenir-light", color: "#303131",}}>
        {store.logged ? (
          <div className="dropdown">
          <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ border: "none", background: "transparent", fontSize:"24px"}}>
            My Profile
          </button>
          <ul className="dropdown-menu ps-2" style={{fontSize:"18px", width:"200px"}}>
          <li className="dropdown-element pb-2"><Link style={{ textDecoration: "none", outline: "none", color:"black"}} to="/favourites">Favourites</Link></li>
          <li className={"dropdown-element pb-2" +(showCredentialsVersion ? "invisible" : "")}><Link style={{ textDecoration: "none", outline: "none", color:"black"}} to="/manageaccount">Manage my Account</Link></li>
          <li className="dropdown-element"><a type="button" onClick={actions.logout}> Logout</a></li>
          </ul>
        </div>
          ) : (
          <Link style={{ textDecoration: "none", outline: "none" }} to="/login">
          <button
            className="navbar navbarCustom"
            style={{ border: "none", background: "transparent", marginRight:"8px" }}
          >
            Login
          </button>
          </Link>
        )}
      </div>
      <div className="chatbot col-12" style={{ marginTop: "-40px",}}>
        {showChatBot && (
          <ChatBot setShowChatBot={setShowChatBot} setOrigin={setOrigin} />
        )}
      </div>
    </nav>
  );
};