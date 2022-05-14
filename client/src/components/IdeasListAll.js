import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"
import Button from 'react-bootstrap/Button';

const IdeasListAll = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const { userName } = useParams();
    const [ideaLikes, setIdeaLikes] = useState([]);

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

    return (
        <div>
            <div style={{ marginTop: "0px", marginBottom: "40px", zIndex: "0" }}>
                <div className="homeHero">
                    <h1 className="heroText home"><Link to="/home">Big Bottom Big Board</Link></h1>
                </div>
            </div>
            <IdeasAdd />
            <div className="homeListContainer">
                {
                    ideas.slice(0).reverse().map((idea, index) => {
                        return (

                            <div className="listContainerHome" key={idea._id}>
                                <div className="userText">Posted by <Link to={`/user/profile/${idea.createdBy?.userName}`}>{idea.createdBy?.userName}</Link> at {idea.createdAt}
                                </div>

                                <div className="postText">{idea.ideaName}
                                </div>
                                <div className="likeButtonContainer">
                                    <div className="likeButton">
                                        <Button onClick={() => likeIdea(idea._id, user.userName, user._id)}>Like idea ({idea.ideaLikes.length})</Button>
                                    </div>
                                    <div className="likeButtonLikes">
                                        {/* <p>{user._id} user id</p> */}
                                        <div className="likedByText">Liked By: {idea.ideaLikes + ""}</div>
                                    </div>
                                    <div className="likeIdeaViewIdea">
                                        <Button href={`/ideas/${idea._id}`}>View Idea</Button>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>


    )

}

export default IdeasListAll;