


import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {

    const [registrationConfirmed, setRegistrationConfirmed] = useState("")
    const [errors, setErrors] = useState({})

    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        confirmUserPassword: "",
    })

    const changeHandler = (e) => {
        console.log("changing")
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const registering = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/register",
            user,
            { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setUser({
                    userName: "",
                    userEmail: "",
                    userPassword: "",
                    confirmUserPassword: "",
                })
                setRegistrationConfirmed("Thanks for registering. You can now login",)
                setErrors({})
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }


    return (
        <div>
            {registrationConfirmed ? <h3>{registrationConfirmed}</h3> : null}
            <form onSubmit={registering}>
                <div>
                <label>Username</label>
                <input type="text" name="userName" value={user.userName}
                    onChange={changeHandler}
                />
                </div>
                <div>
                <label>email</label>
                <input type="email" name="userEmail" value={user.userEmail}
                    onChange={changeHandler}
                />
                </div>
                <div>
                <label>Username</label>
                                <input type="text" name="userPassword" value={user.userPassword}
                    onChange={changeHandler}
                />
                </div>
                <div>
                <label>Username</label>
                                <input type="text" name="confirmUserPassword" value={user.confirmUserPassword}
                    onChange={changeHandler}
                />
</div>
<button>Submit</button>




            </form>
        </div>

    )
}

export default Register;
