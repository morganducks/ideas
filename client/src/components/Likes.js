import React, {useState, useEffect} from "react";
import  {useParams} from "react-router-dom";
import axios from "axios";



const Likes = (props)=> {

    const {likes,setLikes} = props;
    const { allIdeas, setAllIdeas } = props;


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

    return(
<div>
    {
allIdeas.map((ideas, index) => {
    <div className="listContainerHome" key={ideas._id}>
<button className="mainButton likeButton" onClick={(e) => likeHandler(ideas._id)}>Give some love</button>
<h3>has {ideas.countLikes.length} likes</h3>
</div>

 } ) }
    </div>
    )}

export default Likes;