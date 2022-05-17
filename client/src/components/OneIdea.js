
//axios, useEffect, useState, Link
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import HomeLogout from "../components/HomeLogout"
import LikeButton from "../components/LikeButton"
import Button from 'react-bootstrap/Button';


const OneIdea = (props) => {

    // const { socket } = props;
    const { ideas, setIdeas } = props;
    const [oneIdea, setOneIdea] = useState({});
    const { user } = props;
    const { id } = useParams();



    //async
    //can use map on array, cannot map object
    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas/${id}`,
        { withCredentials: true })
            .then((res) => {
               setOneIdea(res.data);
           })
            .catch((err) => {
                console.log(err)
                console.log("fail")
            })
    }, [id])


  
    return (
<div>
        <div style={{ marginTop: "0px", marginBottom: "40px", zIndex: "0" }}>
        <div className="homeHero">
            <div style={{ paddingTop: "160px" }}>
                <h1 className="heroTextHome home">Big Bottom Big Board</h1>
                <h2 style={{ color: "white", marginTop: "20px" }}>Where we collaborate on the Big Bottom Festival</h2>
            </div>
        </div>
    </div>
            <div className="homeListContainer">
            <div className="userTextOneIdea">Posted by {oneIdea.createdBy?.userName}</div>
            <p>{oneIdea.createdAt}</p>
            <div className="postText">{oneIdea.ideaName}</div>
            {/* 
<div style={{marginTop:"20px"}}>
                    <LikeButton
                        user={user}
                            idea={whoHasLiked}
                            ideas={ideas}
                            setIdeas={setIdeas}
 
/>
</div>*/}

<h3 style={{ marginTop: "40px", paddingTop: "40px", borderTop:"1px solid black"}}>People who have liked this post</h3>

            {
                oneIdea?.ideaLikes?.map((whoHasLiked, index) => {
                    return(
                    <div className="profileMainLikesSection" key={index}>
                        
                        <div className="profileLikesSection">
                        <div className="profileLikes">
                        <p style={{ fontSize:"18px", marginTop:"10px", fontWeight: "700" }}>{whoHasLiked} </p>
                        </div>
                        <div className="profileLikesButton">

                        <Button href={`/user/profile/${whoHasLiked}`}>See profile</Button> 
                        </div>
                    </div>
                    </div>
                 
                    )
                }
                )
}


        </div>
        <div style={{marginTop:"60px", borderTop:"1px solid black", paddingBottom:"60px", marginBottom:"50px"}}>
<HomeLogout/>
</div>
</div>



    )
}

export default OneIdea;



    //from course code
    // const addAReply = () => {
    //     axios.post(`http://localhost:8000/api/replies/${id}`,
    //         {
    //             content,
    //             reply: id
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             setReplyList([res.data, ...replyList])
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }


    // useEffect(() => {
    //     socket.on("Update_chat_likes", (data) => {
    //         console.log("our socket updated list", data)
    //         setReplyList(data)
    //     })
    // }, [])

    // const likeReply = (replyFromBelow) => {
    //     axios.put(`http://localhost:8000/api/replies/${replyFromBelow._id}`,
    //         {
    //             likes: replyFromBelow.likes + 1
    //         }
    //     )
    //         .then((res) => {
    //             console.log(res.data);

    //             let updatedReplyList = replyList.map((reply, index) => {
    //                 if (reply === replyFromBelow) {
    //                     let replyHolder = { ...res.data };
    //                     return replyHolder;
    //                 }
    //                 return reply;
    //             });


    //             socket.emit("Update_chat", updatedReplyList)
    //         })
    // }

    // const result = Object.keys(oneIdea).map(key => {
    //     console.log(key);
    //     console.log(oneIdea[key]);

    //     return {[key]: oneIdea[key]};
    //   });


    //   console.log(result)

    //   const userMap = Object.keys(user).map(key => {
    //     console.log(key); 
    //     console.log(user[key]);
    //     return {[key]: user[key]};
    //   });


    //   console.log(userMap)
