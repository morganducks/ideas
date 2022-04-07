import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const IdeasListAll = (props) => {

    const [ allIdeas, setAllIdeas ] = useState([]);
    const [ user, setUser ]  = useState({});



    useEffect(() => {
        axios.get("http://localhost:8000/api/ideas",
        { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setAllIdeas(res.data);
            })
            .catch((err) => console.log(err));
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


    // const deleteIdeas = (idFromBelow) => {
    //     axios.delete(`http://localhost:8000/api/ideas/${idFromBelow}`)
    //         .then((res) => {
    //             console.log(res);
    //             console.log(res.data);
    //             setAllIdeas(allIdeas.filter(ideas => ideas._id !== idFromBelow))
    //         })
    //         .catch((err) => console.log(err));
    // }

    //    remember to add to model
    return (
        <div>
Some text
            {
                allIdeas.map((ideas, index) => {
                    return (

                        <div className="ideasBackground" key={index}>

                            <div className="listContainerHome" key={ideas._id}>
                                <p>{ideas.ideaName}</p>
                                <p>{ideas.createdBy?.userName}</p>
                               

                                    {/* <h3 className="listName">{ideas.userName}</h3></Link>
                                <p className="listStylesHome"><span style={{ fontWeight: "700" }}>Type: {ideas.ideaName}</span></p>

                                <div className="viewLinkBtn"><Link to={`/ideas/${ideas._id}`}>Get to know more about {ideas.ideaName}</Link></div>
                                <div className="homeEditLink"><Link to={`/ideas/edit/${ideas._id}`}>Edit {ideas.ideaName}'s info</Link> */}
                            </div>
                            </div>

                       

                    )
                })
            }
        </div>


    )

}

export default IdeasListAll;
