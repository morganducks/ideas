
//axios, useEffect, useState, Link
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"



const OneIdea = (props) => {

    // const { socket } = props;
    const { ideas, setIdeas } = props;
    const [oneIdea, setOneIdea] = useState({});
    const { user, setUser } = props;
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data)
                // console.log(user.userName + " user pull")
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    //async
    //can use map on array, cannot map object
    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setOneIdea(res.data);
            })
            .catch((err) => {
                console.log(err)
                console.log("fail")
            })
    }, [id])


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


    return (
        <div>
<div style={{ marginTop: "0px", marginBottom: "40px", zIndex: "0" }}>
                <div className="homeHero">
                    <h1 className="heroText home"><Link to="/home">Big Bottom Big Board</Link></h1>
                </div>
            </div>
            <div className="homeListContainer">
            <div className="userText">Posts by {oneIdea.createdBy?.userName}</div>
            <div className="postText">{oneIdea.ideaName}</div>
            
            <p>{oneIdea.createdAt}</p>
            <p>{oneIdea?.ideaLikes?.length}</p>
            {
                oneIdea?.ideaLikes?.map((likes, index) => {
                    return(
                    <div key={index}>
                        <p><Link to={`/user/profile/${likes}`}>{likes}</Link></p>
                        <p>{likes.name}</p>
                    </div>
                    )
                }
                )
}
        </div>
        <div style={{marginBottom: "40px", textAlign: "center"}}>
                <Link to="/home">Home</Link>  |  <Link to="logout">Log out</Link>
                </div>
        </div>



    )
}

export default OneIdea;
