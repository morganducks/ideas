import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {

    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/login",
        {
            userEmail: userEmail,
            userPassword: userPassword,
        },
        { withCredentials: true},
        )
        .then((res) => {
            console.log(res,"res")
            console.log(res.data, "is data")
            navigate("/home")
        })
        .catch((err) => {
            console.log(err.response.data);
            setErrorMessage(err.response.data.message);
        })
    }

return(
<div>
    Login
    <form onSubmit={login}>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="userEmail"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="text"
                        name="userPassword"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <button>Sign In</button>
                </div>
            </form>
</div>

)

}

export default Login;
