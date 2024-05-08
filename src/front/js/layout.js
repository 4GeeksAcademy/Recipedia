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
            <Route
              element={<RecipeCard origin={origin} />}
              path="/recipe/:title"
            />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
