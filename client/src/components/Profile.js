import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IdeasAdd from "../components/IdeasAdd"




const Profile = (props) => {
    const { userName } = useParams();
    const { ideas, setIdeas } = props;
    const { ideaLikes, setIdeaLikes } = props;
    const { user, setUser } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideasByUser/${userName}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                console.log("not finding")
            })
    }, [])



    return (
        <div>
            Profile

            {userName}

            <IdeasAdd />

            {
                user.map((profile, index) => {
                    return (
                        <div key={index}>
                            <p>{profile.ideaName}</p>
                            <p>{profile.createdAt}</p>
                            <p>{profile.createdBy.userEmail}</p>
                            <p>{profile.ideaLikes}</p>
                            <p>{profile.ideaLikes.length}</p>
                        </div>
                    )
                }
                )
            }

        </div>

    )

}

export default Profile;
