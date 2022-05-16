import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import IdeasAdd from "../components/IdeasAdd"
import Button from 'react-bootstrap/Button';




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

    const likeIdea = (idea, user) => {
        axios.get(`http://localhost:8000/api/ideas/${idea}`)
            .then((res) => {
                console.log(res, user)
                //help from former Dojo student
                const updateLikes = { ...res.data };
                updateLikes.ideaLikes.push(user);
                const finalLikes = [...new Set(updateLikes.ideaLikes)]
                updateLikes.ideaLikes = finalLikes;
                axios.put(`http://localhost:8000/api/ideas/${idea}`,
                    updateLikes
                )
                    .then((res) => {
                        console.log(res.data);
                        setIdeaLikes(res.data);
                        console.log("edited")

                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
        // window.location.reload(false);
    }


    //loop through records and add all ideaLikes

    return (
        <div>

            <div style={{ marginTop: "0px", marginBottom: "40px", zIndex: "0" }}>
                <div className="homeHero">
                    <h1 className="heroText home"><Link to="/home">Big Bottom Big Board</Link></h1>
                </div>
            </div>
            <h1>{userName}'s profile</h1>
            <p>{ideas.ideaLikes}</p>

            {/* <IdeasAdd /> */}
            <div className="homeListContainer">
                {
                    ideas.map((profile, index) => {
                        return (
                            <div key={index}>
                                <div className="postText">{profile.ideaName}</div>


                                <div className="likeButton">
                                    <Button onClick={() => likeIdea(ideas._id, user.userName)}>Like idea</Button>
                                </div>
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
                <div style={{ marginBottom: "40px", textAlign: "center" }}>
                    <Link to="/home">Home</Link>  |  <Link to="logout">Log out</Link>
                </div>
            </div></div>

    )

}

export default Profile;
