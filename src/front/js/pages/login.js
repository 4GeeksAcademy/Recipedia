import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import login from "../../img/login.png";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");

    const handleLogin = async () => {
        try {
            const result = await actions.login(email, password);
            if (result) {
                navigate("/");
                setLoginStatus("success");
            } else {
                setLoginStatus("error");
            }
        } catch (error) {
            setLoginStatus("error");
        }
    };

    return (
        <div className="card" style={{ minHeight: "50vh", fontFamily: "avenir-light", color: "#303131", borderBottomColor: "white" }}>
			{loginStatus === "error" && (
				<div className="bg-white text-center p-5 h-25">
					<h2 className="text-danger"style={{fontSize: "40px",}}>Oops! Incorrect username or password..</h2>
					<p className="text-muted" style={{fontSize: "40px",}}>
						Please try again.
					</p>
				</div>
			)}
			{/* {loginStatus === "success" && (
                <div className="bg-white text-center p-5 h-25" style={{zIndex:"+1"}}>
                    <h2 className="text-success">Welcome to your account.</h2>
                    <p className="text-muted">
                        You have successfully logged in.
                    </p>
                </div>
            )} */}
            <div className="row">
                <div className="col-md-6" style={{ height: "700px", overflow: "hidden", position: "relative" }}>
                    <img src={login} className="img-fluid rounded-start" alt="login" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
                <div className="col-md-6 mx-auto" style={{ width: "700px" }}>
                    <div className="card-body ">
                        <h5 className="card-title" style={{ fontSize: "60px", margin:"90px 0 60px 0" }}>LOGIN</h5>
                        <label htmlFor="InputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control mb-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email Address"
                        />
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your Password"
                        />
                        <button type="button" className="btn btn-light mb-3 w-100 mt-4" onClick={handleLogin} style={{ backgroundColor: "#273A4E", color: "white" }}>Login</button>
                        <Link to="/signup">
                            <button type="button" className="btn btn-light w-100" style={{ backgroundColor: "#273A4E", color: "white" }}>Not a user yet? Sign up here!</button>
                        </Link>
                    </div>
                </div>
            </div>
            {loginStatus === "success" && (
                <div className="bg-white text-center p-5 h-25">
                    <h2 className="text-success">Welcome to your account.</h2>
                    <p className="text-muted">
                        You have successfully logged in.
                    </p>
                </div>
            )}
        </div>
    );
};


// import React, { useState, useContext } from "react";
// import { Context } from "../store/appContext";
// import login from "../../img/login.png";
// import "../../styles/home.css";
// import { Link, useNavigate } from "react-router-dom";

// export const Login = () => {
// 	const { store, actions } = useContext(Context);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
// 	const navigate = useNavigate();
// 	const [loginStatus, setLoginStatus] = useState("");


//     const handleLogin = async () => {
//         let result = actions.login(email, password);
// 		if (result) {
// 			navigate("/")
// 			setLoginStatus("success");
// 		}
// 		else{
// 			alert ("Unable to login")
// 			setLoginStatus("error");
// 		}
//     };

// 	return (
// 		<div className="card" style={{minHeight: "100vh", fontFamily:"avenir-light", color: "#303131", borderBottomColor:"white"}}>
// 			<div className="row">
// 				<div className="col-md-6" style={{ height: "700px", overflow: "hidden", position:"relative" }}>
// 					<img src={login} className="img-fluid rounded-start" alt="login" style={{position:"absolute", top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}/>
// 				</div>
// 				<div className="col-md-6 mx-auto" style={{ width: "500px" }}>
// 					<div className="card-body ">
// 						<h5 className="card-title" style={{ fontSize: "50px", margin:"30px 0 30px 0" }}>LOGIN</h5>
// 						<label htmlFor="InputEmail" className="form-label">Email</label>
// 						<input
// 							type="email"
// 							className="form-control mb-2"
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}
// 							placeholder="Your Email Address"
// 						/>
// 						<label htmlFor="InputPassword" className="form-label">Password</label>
// 						<input
// 							type="password"
// 							className="form-control"
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							placeholder="Your Password"
// 						/>
// 						<button type="button" className="btn btn-light mb-3 w-100 mt-4" onClick={handleLogin} style={{backgroundColor:"#273A4E", color:"white"}}>Login</button>
// 						<Link to="/signup">
// 							<button type="button" className="btn btn-light w-100" style={{backgroundColor:"#273A4E", color:"white"}}>Not a user yet? Register here!</button>
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 			{/* Login Status Message */}
// 			 {loginStatus === "error" && (
//                 <div className="bg-white text-center p-5 h-25">
//                     <h2 className="text-danger">Oops! Incorrect username or password..</h2>
//                     <p className="text-muted">
//                         Please try again.
//                     </p>
//                 </div>
//             )}
//             {loginStatus === "success" && (
//                 <div className="bg-white text-center p-5 h-25">
//                     <h2 className="text-success">Welcome to your account.</h2>
//                     <p className="text-muted">
//                         You have successfully logged in.
//                     </p>
//                 </div>
//             )}
// 		</div>
// 	);
	
// };