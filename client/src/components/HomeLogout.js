import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button';

const HomeLogout = (props) => {

    const navigate = useNavigate();

const logout = (e) => {
    axios
        .post(
            "http://localhost:8000/api/user/logout",
            {}, 
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
};

return(



<div style={{marginBottom: "40px", marginTop: "40px", textAlign: "center"}}>
<Button style={{marginRight: "40px"}} href="/home">Home</Button>|<Button style={{marginLeft: "40px"}} onClick={logout}>Log out</Button>
</div>
)

}

export default HomeLogout