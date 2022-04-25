import React, {useState, useEffect} from "react";
// import {useParams} from "react-router-dom";
import axios from "axios";



const Likes = (props)=> {

    const { likedPosts,setLikedPosts } = props;
    const { ideas, setIdeas } = props;
    const { userName } = props;
    
  const [isLiked, updateLike] = useState(false);


    const likeHandler = () => {
        let currentLikedPosts = props.likedPosts;
        if (!isLiked) {
          updateLike(true);
          if (!currentLikedPosts.includes(userName))
            props.updateLikedPosts(
              [...currentLikedPosts, userName]
            );
        } else {
          updateLike(false);
          if (currentLikedPosts.includes(userName))
            props.updateLikedPosts(
              currentLikedPosts
              .filter(user => user !== userName)
              );
        }
      };

    return(
<div>


<button className="mainButton likeButton" onClick={likeHandler}>Give some love</button>
<h3>has  likes</h3>


 </div>
 ) 
 }
    

export default Likes;