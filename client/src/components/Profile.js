import React, {useState, useEffect} from "react";
import  {useParams} from "react-router-dom";
import axios from "axios";
import IdeasAdd from "../components/IdeasAdd"




const Profile = (props)=>{

    const {userName} = useParams();
    const [ userList, setUserList ] = useState([]);
    


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/ideasByUser/${userName}`,
        { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUserList(res.data);
            })
            .catch((err) => {
                console.log(err);
                console.log("not finding")
            })
    }, [])




return(
<div>
    Profile
    {userName}

    <IdeasAdd />

        {
        userList.map((userIdea,index) => (
            <div key={index}>
                <p>{userIdea.ideaName}</p>
                <p>{userIdea.createdAt}</p>
                <p>{userIdea.createdBy.userEmail}</p>
                <p>{userIdea.userLikes}</p>
                </div>

        )
        )
        
        

    }

</div>

)

}

export default Profile;
