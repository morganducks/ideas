import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"


const IdeasListAll = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const { userName } = useParams();
    const { socket } = props;
    const { replyList, setReplyList } = props;
    const [ideaLikes, setIdeaLikes] = useState([])
    const [userLike,setUserLike] = useState({})



    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas`,
            { withCredentials: true }

        )
            .then((res) => {
                console.log(res.data);
                setIdeas(res.data);
                // setIdeaLikes(res.data.ideaLikes)
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
                // setIdeaLikes([res.data,...ideaLikes]);
                console.log(user._id + " user pull")
                // setUserLike(res.data.userLike)
                // console.log(userLike)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/ideas/${id}`,
    //         { withCredentials: true }
    //     )
    //         .then((res) => {
    //         // console.log(res.data)
    //         setIdeaLikes([res.data,...ideaLikes])
    //         console.log(ideaLikes);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

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
            console.log(res,user)
            const updateLikes = {...res.data};
            updateLikes.ideaLikes.push(user);
            const finalLikes = [...new Set(updateLikes.ideaLikes)]
            updateLikes.ideaLikes = finalLikes;
        // setIdeaLikes([...res.data.ideaLikes, user]);
        axios.put(`http://localhost:8000/api/ideas/${idea}`,
        updateLikes
        )
        .then((res) => {
            console.log(res.data);
            setIdeaLikes(res.data);
                console.log("edited")
                // event.target.disabled = true;
            })
            .catch((err) => {
                console.log(err)
            })
    })}

    // setIdeaLikes(ideaLikes)
    //     axios.put(`http://localhost:8000/api/ideas/${id}`
    //     )
    //         .then((res) => {
    //             setIdeaLikes(res.data.ideaLikes)
    //             console.log(res.data.ideaLikes);
    //         })
    //         .catch((err) => { console.log(err) });
    // }



    //chain put request to then and then to put to multiple databases.

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

                            {/* <button value={idea.ideaLikes} onClick={(e) => setIdeaLikes(e.target.value +1)}>Like {idea.ideaLikes}</button> */}



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