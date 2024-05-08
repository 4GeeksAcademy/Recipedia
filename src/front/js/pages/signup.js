import React, {useState} from "react";

export const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState('')

    const signUpSubmit = () => {
        event.preventDefault();

        const valid = validateSignUp()
        if (valid) {
            const accountData = {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            console.log("SignUp Submitted!", accountData)
            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        } 
        
    }

    const validateSignUp = () =>{
        const errors = {};
        
        if (!username.trim()) {
            errors.username = "Username is required"
        }
        if (!email.trim()) {
            errors.email = "Email is required"
        }
        else if(!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email format"
        }
        if(!password.trim()) {
            errors.password = "Password is required"
        }
        else if (password.length < 8) {
            errors.password = "Password is required to be 8 characters or more."
        }
        if(password != confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }
        setErrors(errors)
        return Object.keys(errors).length === 0;
    }

    return(
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={signUpSubmit}>
               <label for="username">Username</label>
               <input type="text" 
               id="username" 
               name="username" 
               placeholder="Username" 
               value={username}
               onChange = {(event) => {setUsername(event.target.value)}} />
               {errors.username && <div>{errors.username}</div>}
               <br />

               <label for="email">Email</label>
               <input type="email" 
               id="email" 
               name="email" 
               placeholder="Email" 
               value={email}
               onChange = {(event) => {setEmail(event.target.value)}} />
               {errors.email && <div>{errors.email}</div>}
               <br />

               <label for="password">Password</label>
               <input type="password" 
               id="password" 
               name="password" 
               placeholder="Password" 
               value={password}
               onChange = {(event) => {setPassword(event.target.value)}} />
               {errors.password && <div>{errors.password}</div>}
               <br />

               <label for="confirmpassword">Confirm Password</label>
               <input type="password" 
               id="confirmpassword" 
               name="confirmpassword" 
               placeholder="Confirm Password" 
               value={confirmPassword}
               onChange = {(event) => {setConfirmPassword(event.target.value)}} />
               {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
               <br />

               <button className="btn btn-secondary" onClick={signUpSubmit}>SignUp</button>
            </form>
        </div>
    )
}