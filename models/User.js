const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


/* using mongodb validations */
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