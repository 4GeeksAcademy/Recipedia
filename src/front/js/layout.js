import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import {Cuisine} from "./pages/cuisine";
import {Diet} from "./pages/diet";
import {Intolerances} from "./pages/intolerances"
import injectContext from "./store/appContext";
import {FilteredRecipes} from "./pages/FilteredRecipes"
import {SignUp} from "./pages/signup"
import {Login} from "./pages/login"
import { Footer } from "./component/footer";
import {FilterNavbar} from "./component/filternavbar"
import { RecipeCard } from "./pages/recipeCard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Private } from "./pages/private";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  const [origin, setOrigin] = useState("chatbot");

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar setOrigin={setOrigin} />
          <Routes>
            <Route element={<Home setOrigin={setOrigin} />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Private />} path="/private" />
            <Route element={<RecipeCard origin={origin} />}path="/recipe/:title"/>
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <FilterNavbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Cuisine />} path="/cuisine/:type" />
                        <Route element={<Diet />} path="/diet/:type" />
                        <Route element={<Intolerances />} path="/intolerances/:type" />
                        <Route element={<FilteredRecipes />} path="/filter-recipes" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
