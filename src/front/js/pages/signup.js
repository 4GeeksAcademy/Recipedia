import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import login from "../../img/login.png";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async() => {
       let result = await actions.signUpUser(email, password)
       if (result) {
        navigate("/login")
       }
       else {
        setError("Error occurred, while signing you up")
       }
    };

	return (
		<div className="card" style={{minHeight: "100vh", fontFamily:"avenir-light", color: "#303131", borderBottomColor:"white"}}>
		<div className="row">
			<div className="col-md-6" style={{ height: "700px", overflow: "hidden", position:"relative" }}>
			<img src={login} className="img-fluid rounded-start" alt="login" style={{position:"absolute", top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}/>
			</div>
			<div className="col-md-6 mx-auto" style={{ width: "500px" }}>
				<div className="card-body ">
					<h5 className="card-title" style={{ fontSize: "50px", margin:"30px 0 30px 0" }}>Signup</h5>
						<input
						type="email"
						className="form-control mb-1"
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
					<button type="button" className="btn btn-light mb-3 w-100 mt-1" onClick={handleSignup}>Register</button>
					<Link to="/login">
					<button type="button" className="btn btn-light w-100">Do you already have an account? Login here!</button>
					</Link>
				</div>
			</div>
		</div>
		</div>
	);
};
