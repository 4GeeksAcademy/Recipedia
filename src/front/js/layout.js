import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { RecipeCard } from "./pages/recipeCard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { ManageAccount } from "./pages/manageAccount";
import { Favourites } from "./pages/favourites";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  const [origin, setOrigin] = useState("chatbot");
  const [showChatBot, setShowChatBot] = useState(false);


  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar setOrigin={setOrigin} showChatBot={showChatBot} setShowChatBot={setShowChatBot} />
          <Routes>
            <Route element={<Home setOrigin={setOrigin} />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<ManageAccount />} path="/manageaccount" />
            <Route element={<RecipeCard origin={origin} />}path="/recipe/:title"/>
            <Route element={<Favourites setOrigin={setOrigin} showChatBot={showChatBot}/>} path="/favourites" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer/>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
