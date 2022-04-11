import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const IdeasAdd = (props) => {

    // const {allIdeas, getAllIdeas} = props;

    const navigate = useNavigate(); 

    const [ideaName, setIdeaName] = useState("");

    const submitHandler = (e) => {

        e.preventDefault();
        axios.post('http://localhost:8000/api/ideas', {
            ideaName,
        },
        { withCredentials: true }
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setIdeaName("")
            navigate("/home")
        })
        .catch((err) => {
            console.log(err)
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            // setErrors(err.response.data.errors);
        })
        window.location.reload(false);
    }

return(
<div>
<div className="addButtonRow">
                            <h2>What's your idea?</h2>
                        </div>
                        <form className="formContainer" onSubmit={submitHandler}>
                        <div className="addButtonRow">
                            
                        </div>
                        <div className="ideasRow">
                            <h3></h3>
                            <input value={ideaName} type="text" name="Name" placeholder="Enter your idea here" onChange={(e) => setIdeaName(e.target.value)}
                            />
                            {/* <br />
                            {
                                errors.ideaName ?
                                    <span className="errorMessage">{errors.ideaName.message}</span>
                                    : null
                            } */}

                        </div>
                        <button className="mainButton" style={{ marginRight: "30px" }}>Add idea</button>
                        </form>
</div>

)

}

export default IdeasAdd;
