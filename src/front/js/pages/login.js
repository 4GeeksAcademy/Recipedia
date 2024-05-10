import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import login from "../../img/login.png";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        actions.login(email, password);
    };

	return (
		<div className="card" style={{minHeight: "100vh", fontFamily:"avenir-light", color: "#303131", borderBottomColor:"white"}}>
		<div className="row">
			<div className="col-md-6" style={{ height: "700px", overflow: "hidden", position:"relative" }}>
			<img src={login} className="img-fluid rounded-start" alt="login" style={{position:"absolute", top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}/>
			</div>
			<div className="col-md-6 mx-auto" style={{ width: "500px" }}>
				<div className="card-body ">
					<h5 className="card-title" style={{ fontSize: "50px", margin:"30px 0 30px 0" }}>Login</h5>
					<input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email Address"
                    />
					<input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your Password"
                    />
					<button type="button" className="btn btn-light mb-3 w-100" onClick={handleLogin}>Login</button>
					<Link to="/signup">
					<button type="button" className="btn btn-light w-100">Not a user yet? Register here!</button>
					</Link>
				</div>
			</div>
		</div>
		</div>
	);
};
