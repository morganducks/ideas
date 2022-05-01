const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema ({

userName: {
    type: String,
    required: [true, "Unsername is required"],
    minlength: [3, "Username name must be at least 3 characters long"],
},
userPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password name must be at least 8 characters long"],
},
userEmail: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    // validate: [validateEmail, 'Please fill a valid email address'],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},

userLikes: {
    type: Number,
}



}, { timestamps: true });



UserSchema.virtual("confirmUserPassword")
.get(()=> this._confirmUserPassword)
.set((value) => this._confirmUserPassword = value)

UserSchema.pre("validate", function(next) {
    if(this.userPassword !== this.confirmUserPassword) {
        this.invalidate("confirmUserPassword", "Passwords much match")
        console.log("Passwords do not match")
        alert("password must be at least 8 characters")
    } 
    next()
})

UserSchema.pre("save", function(next) {
    console.log("saving")
    bcrypt.hash(this.userPassword, 10)
    .then((cryptedPassword) => {
        this.userPassword = cryptedPassword;
        next()
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;