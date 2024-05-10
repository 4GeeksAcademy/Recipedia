import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store, actions} = useContext(Context)

    const navigate = useNavigate();
    const loginSubmit = () => {

    if(email.length === 0){
            if (email.length === 0) {
                alert("Email is required")
            }
            else if (password.length === 0) {
                alert("Password is required")
            }
            else{
                actions.loginUser(email, password)
            }
            navigate("/")
        }
    }
    // console.log("This is your token:", store.token)

    // const loginSubmit = () => {
    //     console.log("Login Submitted!", username, password, store.token)
    //     actions.loginToken(username, password)
    // }


    return(
        <div className="container">
            <h1>Login</h1>
            {/* {(store.token && store.token!="" && store.token !=undefined) ? "You are logged in with " + store.token : ( */}
            <div>
               <label for="email">Email Address</label>
               <input type="email" 
               placeholder="email" 
               value={email}
               onChange = {(event) => {setEmail(event.target.value)}} />
               <br />
               <label for="password">Password</label>
               <input type="password" 
               placeholder="Password" 
               value={password}
               onChange = {(event) => {setPassword(event.target.value)}} />
               <br />
               <button className="btn btn-secondary" onClick={loginSubmit}>Login</button>
            </div>
            {/* ) */}
        {/* } */}
            </div>
    )
}