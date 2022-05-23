import express from "express";
const router= express.Router();
import {authUser,
      getUserProfile,
      registerUser,
      updateUserProfile,
      getUsers,
      deleteUser,
      updateUser,
      getUserById} from "../controllers/userController.js" 
import {protect,admin} from "../middleware/authmiddllware.js"


router.route("/").post(registerUser).get(protect,admin, getUsers)
router.post("/login" , authUser)
// to impliment middleware we put as first argument
router.route("/profile").get(protect ,getUserProfile).put(protect ,updateUserProfile)

//delete edit get user by id 
router
.route("/:id")
.delete(protect,admin,deleteUser)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser) 





export default router;