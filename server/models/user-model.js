const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "suspended"],
    },
    userType:{
        type:String,
        required:true,
        
    }
});


userSchema.pre("save", async function (next) {
    const user = this;

    
    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error); 
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = async function(){
try{
    return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin:this.isAdmin
    },
    process.env.JWT_SECTECT_KEY,{
        expiresIn: "30d",
    }
)

}catch(error){
    console.log(error)
}
}


const User = mongoose.model("User", userSchema);
module.exports = User;
