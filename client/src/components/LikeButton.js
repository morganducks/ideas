import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import IdeasAdd from "../components/IdeasAdd"
import Button from 'react-bootstrap/Button';
import Delete from "../components/Delete"
// import Delete from 

const LikeButton = (props) => {
    const { user } = props;
    const { idea } = props;
    const { ideas, setIdeas } = props;



    const likeIdea = () => {
        axios.get(`http://localhost:8000/api/ideas/${idea._id}`)
            .then((res) => {
                console.log(res, user)
                //help from former Dojo student
                const updateLikes = { ...res.data };
                updateLikes.ideaLikes.push(user.userName);
                const finalLikes = [...new Set(updateLikes.ideaLikes)]
                updateLikes.ideaLikes = finalLikes;
                // console.log(updateLikes)
                axios.put(`http://localhost:8000/api/ideas/${idea._id}`,
                    updateLikes
                )
                    .then((res) => {

                        console.log({data: res.data});
                        const newIdeaList = ideas.map(v => {
                            if(v._id === idea._id) {
                                v.ideaLikes = [...res.data.ideaLikes];
                            }
                            return v;
                        });
                        setIdeas(newIdeaList);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    }

    return (
        
                                    <div className="likeButton">
                                        
                                        <Button onClick={likeIdea}>Like idea ({idea.ideaLikes?.length})</Button>
                                    </div>
                                    

                


    )

}

export default LikeButton;