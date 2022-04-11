import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"
// import moment from "moment"


const IdeasListAll = (props) => {

    const { allIdeas, setAllIdeas } = props;
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const {likes,setLikes} = useState([])
    
   

    

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas`,
            { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setAllIdeas(res.data);

            })
            .catch((err) => {
                console.log(err);
                console.log("not finding")
            })
    }, [])


    const likeHandler = (ideaid) => {
        let idea;

        allIdeas.forEach(result => {
            if (result._id === ideaid) {
                idea = result;
            }
        })
        console.log(idea)
        if(idea.countLikes[0] === null) {
            idea.countLikes.shift();
        }
    
        
        idea.countLikes.push("1234")
            axios.put(`http://localhost:8000/api/ideas/${ideaid}`,
                {
                    countLikes: idea.countLikes
                    
                })
                .then(() => {
                    console.log(idea.countLikes.length)
                    setLikes(idea.countLikes.length)
                })
                .catch((err) => {
                    console.log(err)
                });

        }
    


    const deleteIdea = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/ideas/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setAllIdeas(allIdeas.filter(ideas => ideas._id !== idFromBelow))
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
                allIdeas.slice(0).reverse().map((ideas, index) => {
                    return (
                        <div className="listContainerHome" key={ideas._id}>
                            <p>{ideas.ideaName}</p>
                            <p>{ideas.createdAt}</p>
                            <p>{ideas._id}</p>
                            <Link to={`/user/profile/${ideas.createdBy?.userName}`}>{ideas.createdBy?.userName}</Link>

                            {/* <h3 className="listName">{ideas.userName}</h3></Link>
                                <p className="listStylesHome"><span style={{ fontWeight: "700" }}>Type: {ideas.ideaName}</span></p>

                                <div className="viewLinkBtn"><Link to={`/ideas/${ideas._id}`}>Get to know more about {ideas.ideaName}</Link></div>
                                <div className="homeEditLink"><Link to={`/ideas/edit/${ideas._id}`}>Edit {ideas.ideaName}'s info</Link> */}
                            <button className="mainButton likeButton" onClick={(e) => likeHandler(ideas._id)}>Give some love</button>
                            <h3>has {ideas.countLikes.length} likes</h3>
                            <button className="mainButton" onClick={() => deleteIdea(ideas._id)}>Adopt</button>
                        </div>




                    )
                })
            }
        </div>


    )

}

export default IdeasListAll;
