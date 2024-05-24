import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import signup from "../../img/signup.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async() => {
       let result = await actions.signup(email, password)
       if (result) {
        navigate("/login")
       }
       else {
        setError("Error occurred, while signing you up")
       }
    };

	return (
		<div className="card" style={{minHeight: "50vh", fontFamily:"avenir-light", color: "#303131", borderBottomColor:"white"}}>
		<div className="row">
			<div className="col-md-6" style={{ height: "700px", overflow: "hidden", position:"relative", paddingLeft:"0" }}>
			<img src={signup} className="img-fluid rounded-start" alt="signup" style={{ position: "absolute", width:"110vh"}} />
			</div>
			<div className="col-md-6 mx-auto" style={{ width: "700px" }}>
				<div className="card-body ">
					<h5 className="card-title" style={{ fontSize: "60px", margin:"90px 0 60px 0" }}>SIGN UP</h5>
						<label for="InputEmail" className="form-label">Email</label>
						<input
						type="email"
						className="form-control mb-2"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your Email Address"
						/>
						<label for="InputEmail" className="form-label">Password</label>
						<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Your Password"
						/>
					<button type="button" className="btn btn-light mb-3 w-100 mt-4" onClick={handleSignup} style={{backgroundColor:"#273A4E", color:"white"}}>Sign up</button>
					<Link to="/login">
					<button type="button" className="btn btn-light w-100" style={{backgroundColor:"#273A4E", color:"white"}}>Do you already have an account? Login here!</button>
					</Link>
				</div>
			</div>
		</div>
		</div>
	);
};
