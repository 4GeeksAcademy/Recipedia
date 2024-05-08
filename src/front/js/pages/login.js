import React, {useState} from "react";
import { NoEmitOnErrorsPlugin } from "webpack";

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const fetchToken = () => {

        const options = {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }
        fetch(`https://turbo-space-dollop-44r77w9r76rhjv6v-3001.app.github.dev/api/token`, options)
        .then(resp => {
            if (resp.status === 200) return resp.json()
                else throw new Error("Error accessing account")
        })
        .then(data =>{
            
        })
        .catch(error =>{
            console.log(error)
            alert("error accessing account")
        })

    }

    const loginSubmit = () => {
        console.log("Login Submitted!", username, password)
        fetchToken()
        setUsername('')
        setPassword('')
    }

    return(
        <div className="container">
            <h1>Login</h1>
            <form>
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
            </form>
        </div>
    )
}