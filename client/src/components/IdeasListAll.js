import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"


const IdeasListAll = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const { userId} = useParams();
    const { socket } = props;
    const { replyList, setReplyList } = props;
    const [ideaLikes, setIdeaLikes] = useState(0)
    // const [userLikes,setUserLikes] = useState(0)



    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas`,
            { withCredentials: true }

        )
            .then((res) => {
                console.log(res.data);
                setIdeas(res.data);
                setIdeaLikes(res.data.ideaLikes)
                console.log(res + "result")
            })
            .catch((err) => {
                console.log(err);
                console.log("not finding")
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/user",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                // setUserLikes(res.data.userLikes)
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

    const likeIdea = (id, event, ideaLikes, userId, userLikes) => {
        console.log(userId)
            console.log(ideaLikes)
            // console.log(typeof ideaLikes)
            console.log(id)
            axios.put(`http://localhost:8000/api/ideas/${id}`)
                .then((res) => {
                    // console.log(res);
                    console.log("idea likes " + res.data.ideaLikes);
                    console.log("edited")
                    // event.target.disabled = true;
                })
                .catch((err) => {
                    console.log(err)
                })
        }

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
                            <button className="mainButton likeButton" onClick={($event) => likeIdea(idea._id, $event, idea.ideaLikes +1, idea.createdBy?._id)}>Give {idea.ideaLikes} some love</button>
                            <p>{idea.createdBy?.userLikes} user</p>
                            <p>{user._id} user id</p>
                            <p>{idea.ideaLikes}</p>

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
