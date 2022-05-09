import React, { useState, useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const IdeasAdd = (props) => {

    const {ideas, setIdeas} = props;
    // const [ userId, setUserId ] = useState({});
    // const navigate = useNavigate();
    const [ideaName, setIdeaName] = useState("");
    const { id } = useParams();
    const { user, setUser } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                // console.log(userId + " user pull")
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/ideas', {
            ideaName,
            // countLikes,
        },
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setIdeas("")
                setIdeaName("")
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

    return (
        <div>
            <div className="addIdeaContainer">
            <div>
                <h2>Welcome userName here! What's your idea?</h2>
            </div>
            <Form className="formContainer" onSubmit={submitHandler}>
                <div className="ideasRow">
                    <Form.Group>
                    <Form.Control as="textarea" value={ideaName} rows="5" columns="8" placeholder="Enter your idea" onChange={(e) => setIdeaName(e.target.value)}
                    />
                    </Form.Group>
                    {/* <br />
                            {
                                errors.ideaName ?
                                    <span className="errorMessage">{errors.ideaName.message}</span>
                                    : null
                            } */}

                </div>
                <Button type="submit" className="mainButton">Add idea</Button>
            </Form>
            </div>
        </div>

    )

}

export default IdeasAdd;
