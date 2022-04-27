import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"


const IdeasListAll = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const { socket } = props;
    const { replyList, setReplyList } = props;


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
        axios.get("http://localhost:8000/api/user",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
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
                setReplyList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])



    const deleteIdea = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/ideas/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setIdeas(ideas.filter(ideas => ideas._id !== idFromBelow))
                navigate("/home")
            })
            .catch((err) => { console.log(err) });

    }

    //    remember to add to model
    return (
        <div>

            Some text
            <IdeasAdd />
            {
                ideas.slice(0).reverse().map((ideas, index) => {
                    return (
                        <div className="listContainerHome" key={ideas._id}>
                            <Link to={`/ideas/${ideas._id}`}>{ideas.ideaName}</Link>
                            <p>{ideas.createdAt}</p>
                            {
                                replyList.map((allReplies,index) => {
                                    <div key={allReplies._id}>
                                        <p>{allReplies.likes}</p>
                                        </div>
                                })
                            }
                            <Link to={`/ideas/${ideas._id}`}>{ideas._id}</Link>
                            <p>{ideas.replies?.length} replies</p>
                            <br />
                            <Link to={`/user/profile/${ideas.createdBy?.userName}`}>{ideas.createdBy?.userName}</Link>



                            <div>

                            </div>
                            <button className="mainButton" onClick={() => deleteIdea(ideas._id)}>Delete</button>
                        </div>




                    )
                })
            }

        </div>


    )

}

export default IdeasListAll;
