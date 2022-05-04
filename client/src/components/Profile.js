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
                // console.log(res.data.createdBy.ideaLikes);
                setIdeas(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                console.log("not finding")
            })
    }, [])




    //loop through records and add all ideaLikes

    return (
        <div>
            Profile

            {userName}
            <p>{ideas.ideaLikes}</p>

            {/* <IdeasAdd /> */}

            {
                ideas.map((profile, index) => {
                    return (
                        <div key={index}>
                            <p>{profile.ideaName}</p>
                            <p>{profile.createdAt}</p>
                            <p>{profile.createdBy.userEmail}</p>
                            <p>{profile.ideaLikes}</p>
                            <p>Likes of post: {profile.ideaLikes.length}</p>
                            <p>Ideas posted: {ideas.length}</p>
                        </div>
                    )
                }
                )
            }

        </div>

    )

}

export default Profile;
