import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// description auth user and get token
// route POST /api/users/login
// access public route  

const authUser = asyncHandler (async (req,res)=>{
    const {email,password}= req.body

    const user= await User.findOne({email})
//matching the user id if it match we return this data with the token else we cant access
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id:user._id ,
            name:user.name ,
            email: user.email ,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else{
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})




// description Register a new user
// route POST /api/users
// access public route  

const registerUser = asyncHandler (async (req,res)=>{
    const {name , email,password}= req.body

    const userExist= await User.findOne({email})
 if (userExist) {
     res.status(400)
     throw new Error("User already exist")
     
 }
 const user= await User.create({
     name,
     email,
     password
 })
    if (user) {
        res.status(201).json({
            _id:user._id ,
            name:user.name ,
            email: user.email ,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
    
})



// description get user profile
// route GET /api/users/profile
// access private route  

const getUserProfile = asyncHandler (async (req,res)=>{
    
const user= await User.findById(req.user._id)
// pass the token to get the user id fetching that user in the middleware asign it to req.user and use at any protected route
if (user) {
    res.json({
        _id:user._id ,
            name:user.name ,
            email: user.email ,
            isAdmin: user.isAdmin
    })
} else {
    res.status(404)
    throw new Error("User not found")
}
})



// description update user profile
// route PUT /api/users/profile
// access private route  

const updateUserProfile = asyncHandler (async (req,res)=>{
    
    const user= await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password=req.body.password
        }
        const updateUser= await user.save()
        res.json({
            _id:updateUser._id ,
            name:updateUser.name ,
            email: updateUser.email ,
            isAdmin: updateUser.isAdmin,
            token:generateToken(updateUser._id)
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
    })


// description get all users
// route GET /api/users
// access Private/admin route  

const getUsers = asyncHandler (async (req,res)=>{
    //get all users
    const users= await User.find({})
    res.json(users)
    })


// description delete user
// route DELETE /api/users/:id
// access Private/admin route  

const deleteUser = asyncHandler (async (req,res)=>{
    
    const user= await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message:"User removed"})
    } else {
        res.status(404)
        throw new Error ("User not found")
    }
    })

// description GET user by id
// route GET /api/users/:id
// access Private/admin route  

const getUserById = asyncHandler (async (req,res)=>{
    //dont fetch the password
    const user= await User.findById(req.params.id).select("-password")
    
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error ("User not found")
    }})





// description update user by admin
// route PUT /api/users/:id
// access private route  admin

const updateUser = asyncHandler (async (req,res)=>{
    //we dont want to find the logged in user but the id
    const user= await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin  //??
        const updateUser= await user.save()
        res.json({
            _id:updateUser._id ,
            name:updateUser.name ,
            email: updateUser.email ,
            isAdmin: updateUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
    }) 






export {authUser,
       getUserProfile,
       registerUser,
       updateUserProfile,
       getUsers,
       deleteUser,
       updateUser,
       getUserById}