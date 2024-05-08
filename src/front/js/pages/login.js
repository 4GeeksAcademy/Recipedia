import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import login from "../../img/login.png";
import "../../styles/home.css"

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card" style={{minHeight: "100vh", fontFamily:"avenir-light", color: "#303131", borderBottomColor:"white"}}>
		<div className="row">
			<div className="col-md-6" style={{ height: "700px", overflow: "hidden", position:"relative" }}>
			<img src={login} className="img-fluid rounded-start" alt="login" style={{position:"absolute", top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}/>
			</div>
			<div className="col-md-6 mx-auto" style={{ width: "500px" }}>
				<div className="card-body ">
					<h5 className="card-title" style={{ fontSize: "50px", margin:"30px 0 30px 0" }}>Login</h5>
					<input type="text" placeholder="Full Name" className="form-control mb-3"></input>
					<input type="text" placeholder="Email Address" className="form-control mb-3"></input>
					<input type="text" placeholder="Password" className="form-control mb-3"></input>
					<button type="button" className="btn btn-light mb-3 w-100">Login</button>
					<button type="button" className="btn btn-light w-100">Not a user yet? Register here!</button>
				</div>
			</div>
		</div>
		</div>
	);
};
