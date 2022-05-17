import React, { useEffect } from 'react'
import { Link,  } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"
import Button from 'react-bootstrap/Button';
import LikeButton from "../components/LikeButton"
import HomeLogout from "../components/HomeLogout"
import Delete from "../components/Delete"


const IdeasListAll = (props) => {
    const { ideas, setIdeas } = props;
    const { user, setUser } = props;



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




    return (
        <div>
            <div style={{ marginTop: "0px", marginBottom: "40px", zIndex: "0" }}>
                <div className="homeHero">
              
                        <h1 className="heroTextHome home">Big Bottom Big Board</h1>
                        <h2 style={{ color: "white", marginTop: "20px" }}>Where we collaborate on the Big Bottom Festival</h2>
                    </div>
 
            </div>
            <IdeasAdd />
            <div className="homeListContainer">

                {
                    ideas.slice(0).reverse().map((idea, index) => {
                        return (

                            <div className="listContainerHome" key={idea}>
                                
                                <div className="userText">Posted by <Link to={`/user/profile/${idea.createdBy?.userName}`}>{idea.createdBy?.userName}</Link> at {idea.createdAt}

                                <Delete
                                        user={user}
                                        idea={idea}
                                        ideas={ideas}
                                        setIdeas={setIdeas}
                                    />
</div>
                                <div className="postText">{idea.ideaName}
                                </div>
                                <div className="likeButtonContainer">
                                    
                                        <LikeButton
                                            user={user}
                                            idea={idea}
                                            ideas={ideas}
                                            setIdeas={setIdeas}

                                        />
                                    

                                    <div className="likeButtonLikes">

                                        <div className="likedByText">Liked By: {idea.ideaLikes.join(", ")}</div>
                                    </div>
                                    <div className="likeIdeaViewIdea">
                                        <Button href={`/ideas/${idea._id}`}>View Idea</Button>
                                    </div>

                                </div>
                            </div>

                        )
                    })
                }

 <HomeLogout/>
            </div>
        </div>


    )

}

export default IdeasListAll;