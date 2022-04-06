const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema ({

userName: {
    type: String,
    required: [true, "Unsername is required"]
},
userPassword: {
    type: String,
    required: [true, "Password is required"]
},
userEmail: {
    type: String,
    required: [true, "Email is required"]
},
}, { timestamps: true });



UserSchema.virtual("confirmPassword")
.get(()=> this._confirmPassword)
.set((value) => this._confirmPassword = value)

UserSchema.pre("validate", function(next) {
    if(this.userPassword !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords much match")
        console.log("Passwords do not match")
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