import mongoose from "mongoose";
import bcrypt from "bcryptjs"



const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
},{
    // to know when a particular user has been created or when a particular user information has been changed use timestamps
    timestamps:true
})

//put a method in user schema for matched password compare the password to the one entred in the specific user (.this)
userSchema.methods.matchPassword = async function(entredPassword) {
    return await bcrypt.compare(entredPassword,this.password)
}

//if the password is not modified hash it middleware to hash the password pre save before saving
userSchema.pre("save",async function (next){
    if (!this.isModified("password")) {
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)
})

const User =mongoose.model('User',userSchema)


export default User;