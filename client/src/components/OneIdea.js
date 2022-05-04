
//axios, useEffect, useState, Link
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"



const OneIdea = (props) => {

    const { socket } = props;
    const { ideas, setIdeas } = props;
    const [oneIdea, setOneIdea] = useState({});
    const [replyList, setReplyList] = useState([]);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setOneIdea(res.data);
                setReplyList(res.data.replies);
                console.log(oneIdea.ideaLikes)
            })
            .catch((err) => {
                console.log(err)
                console.log("fail")
            })
    }, [id])
    
    //from course code
    const addAReply = () => {
        axios.post(`http://localhost:8000/api/replies/${id}`,
            {
                content,
                reply: id
            })
            .then((res) => {
                console.log(res.data);
                setReplyList([res.data, ...replyList])
            })
            .catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        socket.on("Update_chat_likes", (data) => {
            console.log("our socket updated list", data)
            setReplyList(data)
        })
    }, [])

    const likeReply = (replyFromBelow) => {
        axios.put(`http://localhost:8000/api/replies/${replyFromBelow._id}`,
            {
                likes: replyFromBelow.likes + 1
            }
        )
            .then((res) => {
                console.log(res.data);

                let updatedReplyList = replyList.map((reply, index) => {
                    if (reply === replyFromBelow) {
                        let replyHolder = { ...res.data };
                        return replyHolder;
                    }
                    return reply;
                });


                socket.emit("Update_chat", updatedReplyList)
            })
    }

    return (
        <div style={{ textAlign: "center" }}>

            <div>
                <p>{oneIdea.ideaName}</p>
                <p>{oneIdea.ideaLikes}</p>
            </div>
            {/* <button className="mainButton likeButton" onClick={() => likeIdea(ideas._id, user.userName)}> {user.userName} {ideas.ideaLikes.length} some love</button> */}

            <div>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

                <button onClick={addAReply}>Add reply</button>
                {
                    replyList ?
                        replyList.map((reply, index) => (
                            <div key={index}>
                                <p>{reply.content}</p>
                                <button onClick={() => likeReply(reply)}>Like {reply.likes}</button>
                            </div>
                        ))
                        : null
                }

            </div>

</div>
    )
}




export default OneIdea;
