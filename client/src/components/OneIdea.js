//axios, useEffect, useState, Link

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"



const OneMovie = (props) => {


    const {socket} = props;
    const { ideas, setIdeas } = props;
    const [replyList, setReplyList] = useState([]);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/ideas/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setIdeas(res.data);
                setReplyList(res.data.replys);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])

    const addAReply = () => {
        axios.post("http://localhost:8000/api/replys/" + id,
            {
                content, // content:content
                associatedMovie: id
            })
            .then((res) => {
                console.log(res.data);
                setReplyList([res.data, ...replyList ])
            })
            .catch((err) => {
                console.log(err);
            })
    }



    const deleteOneMovie = ()=>{
        axios.delete(`http://localhost:8000/api/ideas/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/")
                
            })
            .catch((err) => console.log(err))

    }


    useEffect(() => {
        socket.on("Update_chat_likes", (data) => {
            console.log("our socket updated list", data)
            setReplyList(data)
        })
    }, [])

    const likeReply = (replyFromBelow) => {
        axios.put(`http://localhost:8000/api/replys/${replyFromBelow._id}`,
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

                // setReplyList(updatedReplyList);
                socket.emit("Update_chat", updatedReplyList)
            })
    }

    return (
        <div style={{ textAlign: "center" }}>
            <header>
                <h1 style={{
                    fontSize: "50px", borderBottom: "5px double lightgray",
                    marginLeft: "450px", marginRight: "450px"
                }}>{movie.title}</h1>
                <Link to={"/"}>Return Home</Link>
            </header>

            <p>{movie.genre}</p>
            <img src={movie.boxArt} style={{ width: "150px", height: "150px" }}/>
            <p>{movie.watchLength}</p>
            <p>{movie.rating}</p>
            <p>{movie.actors}</p>
            <div>Kid Friendly
                {
                    movie.kidFriendly?
                    <p>Okay for kids!!!</p>
                    :<p>No kiddies allowed!!!!!!</p>
                }
            </div>
            <p>{movie.yearReleased}</p>
            <button onClick={deleteOneMovie}>Delete</button>


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




export default OneMovie;