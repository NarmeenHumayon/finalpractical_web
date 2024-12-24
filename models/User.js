const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


/* using mongodb validations */
/*
Form LOGIN: format:
email
password

form REGISTER format:
First Name
Last Name 
Email
Password
Confirm Password
password and confirm paswrod must match 
*/
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please ENTER name'],
        minlength: 3,
        maxlength: 50
    },

    email:{
        type: String,
        required: [true, "Please ENTER email"],
        minlength: 3,
        maxlength: 50,
        match: [
            /*https://www.w3resource.com/javascript/form/email-validation.php */
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please ENTER a valid email!',
          ],
          unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 3
    },
});

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})



UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);

/*
npm i bcrypt
o hash passwords, bcrypt’s password hashing algorithm combines the password string, salt, and the cost to derive a 24-byte hash using base 64 encoding.
*/

/*
I am using 
bcrypt.salt()
bcrypt.compare() to check if login password matches to password input
bcrypt.hash() to 

example usages from website: stackoverflow.com 
//required files
const express = require('express')
const router = express.Router();

//bcryptjs
const bcrypt = require('bcryptjs')

//User modal of mongoDB
const User = require('../../models/User')


//Post request for login
router.post('/', (req, res) => {
    //email and password
    const email = req.body.email
    const password = req.body.password

    //find user exist or not
    User.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) return res.status(400).json({ msg: "User not exist" })

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    return res.status(200).json({ msg: "Login success" })
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }

            })

        })

})

module.exports = router
 */