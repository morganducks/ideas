


import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const Register = (props) => {
    //source: lecture
    const [registrationConfirmed, setRegistrationConfirmed] = useState("")
    const [errors, setErrors] = useState({})

    const [user, setUser] = useState({
        name: "",
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
            <div class="formContainer">
                <h2>Not already a member? Sign up</h2>
                {registrationConfirmed ? <h3>{registrationConfirmed}</h3> : null}
                <Form onSubmit={registering}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            required
                            type="name" placeholder="Enter name" type="text" name="userName" value={user.name}
                            onChange={changeHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            required
                            type="username" placeholder="Enter username" type="text" name="userName" value={user.userName}
                            onChange={changeHandler} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="Enter email" type="email" name="userEmail" value={user.userEmail}
                            onChange={changeHandler}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="text" placeholder="Enter password" name="userPassword" value={user.userPassword}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        {errors.confirmUserPassword ? (
                            <span className="">
                                {errors.user.message}
                            </span>
                        ) : null}
                        <Form.Control type="text" name="confirmUserPassword" placeholder="Confirm password" value={user.confirmUserPassword}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>




                </Form>
            </div>
        </div>

    )
}

export default Register;
