import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'



const Replies = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    const { id } = useParams();
    const { socket } = props;
    const { replyList, setReplyList } = props;
    const {content, setContent} = props;


    // useEffect(() => {
    //     socket.on("Update_chat_likes", (data) => {
    //         console.log("our socket updated list", data)
    //         setReplyList(data)

    //     })
    // }, [])

    const likeReply = (replyFromBelow) => {
        axios.put(`http://localhost:8000/api/replies/${replyFromBelow._id}`,
            {
                likes: replyFromBelow.likes + 1
            }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
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

    return (
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
    )
}

export default Replies