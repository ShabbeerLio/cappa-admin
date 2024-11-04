import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import logo from "../../Assets/logo.png"
import host from '../../Host/Host'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json)
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert("Logedin successfully", "success")
            history("/")
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='login-container'>
            <div className="login-box">
                <div className="login-box-imag">
                    <img src={logo} alt="" />
                </div>
                <p>Login</p>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input type="email" value={credentials.email} onChange={onChange} name="email" id="email" required />
                        <label htmlFor="email" >Email</label>
                    </div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    <div className="user-box">
                        <input type="password" value={credentials.password} onChange={onChange} name="password" id="password" required />
                        <label htmlFor="password" >Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {/* <span></span>
                        <span></span>
                        <span></span>
                        <span></span> */}
                        Log In
                    </button>
                </form>
                {/* <p>Don't have an account? <Link to="/signup" className="a2">Sign up!</Link></p> */}
            </div>

        </div>
    )
}

export default Login