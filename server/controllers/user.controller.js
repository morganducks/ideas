const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {



    register: (req, res) => {
        const user = new User(req.body)

        user.save()
            .then((newUser) => {
                res.json({
                    thanksMessage: "Thank you for signing up",
                    user: newUser,
                })
                console.log("New user registered")
                console.log(newUser)
            })
            .catch((err) => {
                res.status(400).json(err);
                console.log("Register not successful")
            })
    },

    login: (req, res) => {
        User.findOne({ userEmail: req.body.userEmail })
            .then((userInfo) => {
                if (userInfo === null) {
                    res.status(400).json({ message: "invalid login attempt" })
                } else {
                    bcrypt.compare(req.body.userPassword, userInfo.userPassword)
                        .then((validPassword) => {
                            if (validPassword) {
                                console.log("password is valid")
                                res.cookie("userToken",
                                    jwt.sign({
                                        id: userInfo._id,
                                        userName: userInfo.userName,
                                        userEmail: userInfo.userEmail,
                                    },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        // expires:
                                    }
                                ).json({
                                    message: "Logged in!",
                                    userLoggedIn: userInfo.userName,
                                    userID: userInfo._id,
                                });
                            } else {
                                res.status(400).json(
                                    { message: "Invalid Login" })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json(
                                { message: "Invalid Login" });
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json(
                    { message: "Invalid Login" });
            })

    },

    logout: (req, res) => {
        console.log("Logging out")
        res.clearCookie("userToken")
        res.json({
            message: "You have logged out"
        })
    },

    loggedInUser: (req, res) => {
        // const decodeJWT = jwt.decode(req.cookies.userToken, {
        //     complete: true,
        // })
        User.findOne({_id: decodeJWT.jwtPayload.id})
        .then((user)=> {
            console.log(user)
            res.json(user)
        }
        
        )
    }




}