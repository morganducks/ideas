import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"




const IdeasListAll = (props) => {

    const { ideas, setIdeas } = props;
    const { user, setUser } = props;
    // const [user, setUsers] = useState({})
    const navigate = useNavigate();
    const { id } = useParams();




    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas`,
            // { withCredentials: true }
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
                setLiked(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    const likeHandler = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/user',
        // { withCredentials: true },
        liked,
    )
        .then((res) => {
                setLiked([])
                console.log(liked)
            })
            .catch((err) => {
                console.log(err);
            })

    }

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



    // need to display fromt latest to oldest

    //    remember to add to model
    return (
        <div>

            Some text
            <IdeasAdd />
            {
                ideas.slice(0).reverse().map((ideas, index) => {
                    return (
                        <div className="listContainerHome" key={ideas._id}>
                            <p>{ideas.ideaName}</p>
                            <p>{ideas.createdAt}</p>
                            <p>{ideas._id}</p>
                            <p>{ideas.userLikes}</p>
                            <Link to={`/user/profile/${ideas.createdBy?.userName}`}>{ideas.createdBy?.userName}</Link>

                            {/* <h3 className="listName">{ideas.userName}</h3></Link>
                                <p className="listStylesHome"><span style={{ fontWeight: "700" }}>Type: {ideas.ideaName}</span></p>

                                <div className="viewLinkBtn"><Link to={`/ideas/${ideas._id}`}>Get to know more about {ideas.ideaName}</Link></div>
                                <div className="homeEditLink"><Link to={`/ideas/edit/${ideas._id}`}>Edit {ideas.ideaName}'s info</Link> */}

                            <button className="mainButton likeButton" onClick={() => likeHandler()}>Give some love</button>
                            <h3>has {liked} likes</h3>

                            <button className="mainButton" onClick={() => deleteIdea(ideas._id)}>Delete</button>
                        </div>




                    )
                })
            }

        </div>


    )

}

export default IdeasListAll;
