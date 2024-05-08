import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {store, actions} = useContext(Context)


    console.log("This is your token:", store.token)

    const loginSubmit = () => {
        console.log("Login Submitted!", username, password, store.token)
        actions.loginToken(username, password)
    }


    return(
        <div className="container">
            <h1>Login</h1>
            {(store.token && store.token!="" && store.token !=undefined) ? "You are logged in with " + store.token : (
            <div>
               <label for="username">Username</label>
               <input type="text" 
               id="username" 
               name="username" 
               placeholder="Username" 
               value={username}
               onChange = {(event) => {setUsername(event.target.value)}} />
               <br />
               <label for="password">Password</label>
               <input type="password" 
               id="password" 
               name="password" 
               placeholder="Password" 
               value={password}
               onChange = {(event) => {setPassword(event.target.value)}} />
               <br />
               <button className="btn btn-secondary" onClick={loginSubmit}>Login</button>
            </div>
            )
        }
            </div>
    )
}