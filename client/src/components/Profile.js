import React, {useState, useEffect} from "react";
import  {useParams} from "react-router-dom";
import axios from "axios";



const Profile = (props)=>{

    const {userName} = useParams();

    // const [ allIdeas, setAllIdeas ] = useState([]);
    const [ userList, setUserList ]  = useState({});


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/profile/${userName}`,
        { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setUserList(res.data);
            })
            .catch((err) => console.log(err));
    }, [])


return(
<div>
    Profile
    {userName}
</div>

)

}

export default Profile;
