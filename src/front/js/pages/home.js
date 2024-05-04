import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { ChatBot } from "../component/chatbot/chatbot";
import background from "../../img/background.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5" style={{ minHeight: "100vh" }}>
            <img src={background} style={{ width: "100%" }} alt="Background" />
        </div>
	);
};
