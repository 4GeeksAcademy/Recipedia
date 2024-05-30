import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import login from "../../img/login.png";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const ManageAccount = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [authStatus, setAuthStatus] = useState("pending");

    useEffect (()=> {
        const authentication = async () => {
            let result = await actions.verifyAuthToken()
            if (result) {
                setAuthStatus("granted")
            }
            else {
                setAuthStatus("denied")
            }
        }
        authentication()
    }, []) 

    const handleUpdate = async () => {
        let result = actions.update(email, password);
		if (result) {
			navigate("/")
		}
		else{
			alert ("Unable to update")
		}
    };

    const handleDelete = async () => {
        let result = actions.delete();
		if (result) {
			navigate("/")
		}
		else{
			alert ("Unable to delete")
		}
        setShowModal(false);
    };

	return (
		<div className="card" style={{minHeight: "50vh", fontFamily:"avenir-light", color: "#303131", borderBottomColor:"white"}}>
            {authStatus == "pending" ? (<div style={{fontSize: "40px",}}>Please wait while we authenticate you.</div>):
             authStatus == "denied" ? (
				<div className="bg-white text-center p-5 h-25">
					<h2 className="text-danger" style={{ fontSize: "40px",}}>Oops! You don't have access to this area.</h2>
					<p className="text-muted" style={{fontSize: "40px",}}>
						Please <Link to="/login">login</Link> first.
					</p>
				</div>
			) : authStatus == "granted" ? (       
		<div className="row">
			<div className="col-md-6" style={{ height: "700px", overflow: "hidden", position:"relative" }}>
			<img src={login} className="img-fluid rounded-start" alt="login" style={{position:"absolute", top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}/>
			</div>
			<div className="col-md-6 mx-auto" style={{ width: "700px" }}>
			<div className="card-body">
    <h5 className="card-title" style={{ fontSize: "60px", margin:"90px 0 60px 0"}}>MANAGE MY ACCOUNT</h5>
        <label htmlFor="InputEmail" className="form-label mr-2">Update Email</label>
    <div className="input-container d-flex align-items-center mb-2">
        <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your New Email Address"
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil ms-2 mb-4" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
        </svg>
    </div>
    <label htmlFor="InputPassword" className="form-label">Update Password</label>
	<div className="input-container d-flex align-items-center mb-2">
    <input
        type="password"
        className="form-control mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your New Password"
    />
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil ms-2 mb-4" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
        </svg>
	</div>
    <button type="button" className="btn btn-light mb-3 mt-4" onClick={handleUpdate} style={{ backgroundColor: "#273A4E", color: "white", width:"622px" }}>Update my Account</button>
        <button type="button" className="btn btn-light" onClick={() => setShowModal(true)} style={{ backgroundColor: "#E84A43", color: "white", width:"622px" }}>Delete my Account</button>

{showModal && (
    <div className="modal-dialog modal-dialog-centered" style={{maxWidth:"700px", width:"625px", zIndex:"3", position:"absolute", top:"370px" }}>
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Are you sure you want to delete your account?</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Go back</button>
                <button type="button" className="btn" onClick={handleDelete} style={{ backgroundColor: "#E84A43", color: "white", }}>Delete my account</button>
            </div>
        </div>
    </div>
)}
</div>
			</div>
		</div>
            ) : (<div className="bg-white text-center p-5 h-25">
            <h2 className="text-danger" style={{fontSize: "40px",}}>Oops! An error accurred.</h2>
            <p className="text-muted" style={{fontSize: "40px",}}>
                Please try again.
            </p>
        </div>)}
		</div>
	);
};