import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"
import oneIdea from "../components/OneIdea"


const IdeasListAll = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const { userName } = useParams();
    const { ideaLikes, setIdeaLikes } = props;
    const {ideaLikesForUser, setIdeaLikesForUser} = props;

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

    useEffect(() => {
        axios.get("http://localhost:8000/api/replies",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
            })

            .catch((err) => {
                console.log(err);
            })
    }, [])

    //chain put request to then and then to put to multiple databases.

    const deleteIdea = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/ideas/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                setIdeas(ideas.filter(ideas => ideas._id !== idFromBelow))
                navigate("/home")
            })
            .catch((err) => { console.log(err) });
    }

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
                        console.log(res.data.ideaLikes + " idea")
                        console.log("edited")
                        // setIdeaLikesForUser(res.data.ideaLikes +1);
                        // console.log(ideaLikesForUser +"userlikes");
                        // event.target.disabled = true;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    
            })
    }

    return (
        <div>

            Some text
            <IdeasAdd />
            {
                ideas.slice(0).reverse().map((idea, index) => {
                    return (
                        <div className="listContainerHome" key={idea._id}>
                            <Link to={`/ideas/${idea._id}`}>{idea.ideaName}</Link>
                            <p>{idea.createdAt}</p>

                            <Link to={`/ideas/${idea._id}`}>{idea._id}</Link>
                            {idea.replies.map((postReply) => {
                                return (
                                    <div key={postReply._id}>
                                        <p>{postReply.content}</p>
                                    </div>
                                )
                            })}
                            <p>{idea.replies?.length} replies</p>
                            <br />
                            <Link to={`/user/profile/${idea.createdBy?.userName}`}>{idea.createdBy?.userName}</Link>

                            <button className="mainButton likeButton" onClick={() => likeIdea(idea._id, user.userName)}> {user.userName} {idea.ideaLikes.length} some love</button>

                            <p>{user._id} user id</p>
                            <p>{idea.ideaLikes} users who have liked this</p>

                            <div>

                            </div>
                            <button className="mainButton" onClick={() => deleteIdea(idea._id)}>Delete</button>
                        </div>




                    )
                })
            }

        </div>


    )

}

export default IdeasListAll;