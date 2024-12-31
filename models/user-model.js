const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// middleware
// userSchema or database me save krne se pahele aap is function ko run kr dijiye
userSchema.pre('save', async function (next) {
    //   console.log();
    const user = this;

    if (!user.isModified('password')) {
        next();
    }

    try{
         const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
        

    }
    catch(error){
        next(error);
    }

});

//compare with password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    
}

// userSchema.methods <- allows you to create functions

userSchema.methods.generateToken = async function() {
    try{
        return jwt.sign({
            // payload for JWT
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn: "30d",
        }
     );

    }
    catch(error){
        console.log(error);
    }

};





const User = new mongoose.model("User", userSchema);

module.exports = User; 