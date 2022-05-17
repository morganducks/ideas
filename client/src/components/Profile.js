import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import HomeLogout from "../components/HomeLogout"
import LikeButton from "../components/LikeButton"
import Delete from "../components/Delete"
import Button from 'react-bootstrap/Button';



const Profile = (props) => {
    const { userName } = useParams();
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const { idea } = props;
    const { id } = useParams();



    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideasByUser/${userName}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setIdeas(res.data);
                setUser(res.data)
                console.log(userName.userEmail)
            })
            .catch((err) => {
                console.log(err);
                console.log("not finding")
            })
    }, [])



    //loop through records and add all ideaLikes

    return (
        <div style={{ marginBottom: "50px" }}>

            <div style={{ marginTop: "0px", marginBottom: "40px", zIndex: "0" }}>
                <div className="homeHero">
                    <div style={{ paddingTop: "160px" }}>
                        <h1 className="heroTextHome home">Big Bottom Big Board</h1>
                        <h2 style={{ color: "white", marginTop: "20px" }}>Where we collaborate on the Big Bottom Festival</h2>
                    </div>
                </div>
            </div>
            <HomeLogout />
            <h1>{userName}'s profile</h1>
            <p>{ideas.ideaLikes}</p>
            <div className="homeListContainer">
                <h4 style={{ textAlign: "center", marginBottom: "30px" }}>Ideas posted: {ideas.length}</h4>

                {
                    ideas.map((profile, index) => {
                        return (
                            <div key={index}>
                                <div className="listContainerHome">
                                    <p style={{ fontSize: "14px", textAlign: "center" }}>{profile.createdAt}</p>
                                    <div className="postText">{profile.ideaName}</div>
                                    <div className="likeButtonContainer">

                                        <LikeButton
                                            user={user}
                                            idea={profile}
                                            ideas={ideas}
                                            setIdeas={setIdeas}

                                        />


                                        <div className="likeButtonLikes">

                                            <div className="likedByText">Liked By: {profile.ideaLikes.join(", ")}</div>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <Delete
                                        user={user}
                                        idea={profile}
                                        ideas={ideas}
                                        setIdeas={setIdeas}
                                    />

                                </div>
                            </div>
                        )
                    }
                    )
                }

            </div>

        </div>

    )

}

export default Profile;
