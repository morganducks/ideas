import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"
import Button from 'react-bootstrap/Button';
// import Delete from 

const IdeasListAll = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const { userName } = useParams();
    const { ideaLikes, setIdeaLikes } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas`,
            { withCredentials: true }

        )
            .then((res) => {
                console.log(res.data);
                setIdeas(res.data);
            })
            .catch((err) => {
                console.log(err);
                console.log("not finding")
            })
    }, [])

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

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/replies",
    //         { withCredentials: true }
    //     )
    //         .then((res) => {
    //             console.log(res.data);
    //         })

    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    //chain put request to then and then to put to multiple databases.



    const likeIdea = (idea, user) => {
        axios.get(`http://localhost:8000/api/ideas/${idea}`)
            .then((res) => {
                console.log(res, user)
                //help from former Dojo student
                const updateLikes = { ...res.data };
                updateLikes.ideaLikes.push(user);
                const finalLikes = [...new Set(updateLikes.ideaLikes)]
                updateLikes.ideaLikes = finalLikes;
                // console.log(updateLikes)
                axios.put(`http://localhost:8000/api/ideas/${idea}`,
                    updateLikes
                )
                    .then((res) => {
                        // console.log(ideas)
                        // console.log(res.data.ideaLikes);
                        // setIdeas(res.data)
                        // setIdeas(res.data.ideaLikes);
                        // console.log("edited")
                        // setIdeas({...setIdeas})
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        // window.location.reload(false);
    }

    return (
        <div>
            <div style={{ marginTop: "0px", marginBottom: "40px", zIndex: "0" }}>
                <div className="homeHero">
                    <h1 className="heroText home">Big Bottom Big Board</h1>
                    <h2 style={{ color: "white", marginTop: "20px" }}>Where we collaborate on the Big Bottom Festival</h2>
                </div>
            </div>
            <IdeasAdd />
            <div className="homeListContainer">

                {
                    ideas.slice(0).reverse().map((idea, index) => {
                        return (

                            <div className="listContainerHome" key={idea}>
                                <div className="userText">Posted by <Link to={`/user/profile/${idea.createdBy?.userName}`}>{idea.createdBy?.userName}</Link> at {idea.createdAt}
                                </div>

                                <div className="postText">{idea.ideaName}
                                </div>
                                <div className="likeButtonContainer">
                                    <div className="likeButton">
                                        
                                        <Button onClick={() => likeIdea(idea._id, user.userName)}>Like idea ({idea.ideaLikes?.length})</Button>
                                    </div>
                                    
                                    <div className="likeButtonLikes">
                                        
                                        <div className="likedByText">Liked By: {idea.ideaLikes + ""}</div>
                                    </div>
                                    <div className="likeIdeaViewIdea">
                                        <Button href={`/ideas/${idea._id}`}>View Idea</Button>
                                    </div>
                                    {/* <Delete /> */}
                                </div>
                            </div>

                        )
                    })
                }
                
                <div style={{marginBottom: "40px", textAlign: ""}}>
                <Link to="/home">Home</Link>  |  <Link to="logout">Log out</Link>
                </div>
            </div>
        </div>


    )

}

export default IdeasListAll;