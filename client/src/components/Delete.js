
//axios, useEffect, useState, Link
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"

const Delete = (props) => {
    const { user, setUser } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data)
                console.log(user.userName + " user pull")
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteIdea = (idFromBelow) => {
        // check for idea want to delete to make sure the current user createdBy
        axios.delete(`http://localhost:8000/api/users/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                setUser(user.filter(user => user._id !== idFromBelow))
            })
            .catch((err) => { console.log(err) });
    }

    return (
        <button className="mainButton" onClick={() => deleteIdea(user.createdBy?._id)}>Delete</button>
    )

}

export default Delete;