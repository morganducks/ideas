
//axios, useEffect, useState, Link
import React, { useEffect, useState } from "react";
import {  useParams } from 'react-router-dom'
import axios from "axios";
import Button from 'react-bootstrap/Button';

const Delete = (props) => {
    const { user } = props;
    const { idea } = props;
    const { id } = useParams();
    const { ideas, setIdeas } = props;



    const deleteIdea = () => {
        // check for idea want to delete to make sure the current user createdBy
        axios.delete(`http://localhost:8000/api/ideas/${idea._id}`,
        { withCredentials: true }
    )
            .then((res) => {
                console.log(res.data);
                // going to return the new idea list without the deleted idea
                const newIdeaList = ideas.filter(v => {
                    return(v._id !== idea._id) 
                })
                   
                setIdeas(newIdeaList);
                // (idea.filter(idea => idea.createdBy?._id !== idFromBelow))
            })
            .catch((err) => { console.log(err) });
    }

    if(idea.createdBy._id === user._id) {
        return(
            <Button className="deleteButton" onClick={ deleteIdea }>Delete your idea</Button>
        )
    }

    // return (
       
    //     <button className="mainButton" onClick={() => deleteIdea(idea.createdBy?._id)}>Delete</button>
       
    // )

}

export default Delete;