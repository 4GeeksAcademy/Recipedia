import React from "react";
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

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

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
