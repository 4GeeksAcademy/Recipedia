import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import login from "../../img/login.png"

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card" style={{minHeight: "100vh" }}>
		<div className="row">
			<div className="col-md-4">
			<img src={login} className="img-fluid rounded-start" alt="login"/>
			</div>
			<div className="col-md-8">
			<div className="card-body">
				<h5 className="row card-title">Login</h5>
				
				<input type="text" placeholder="Enter your full name" className=" row form-control"></input>
				<input type="text" placeholder="Enter your email" className="form-control"></input>
				<input type="text" placeholder="Enter your password" className="form-control"></input>
				
			</div>
			</div>
		</div>
		</div>
	);
};
