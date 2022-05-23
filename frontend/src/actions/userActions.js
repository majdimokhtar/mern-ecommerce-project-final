import { USER_DETAILS_FAIL, 
        USER_DETAILS_REQUEST, 
        USER_DETAILS_SUCCESS, 
        USER_LOGIN_FAIL,
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS, 
        USER_LOGOUT,
        USER_REGISTER_FAIL,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_UPDATE_PROFILE_FAIL,
        USER_UPDATE_PROFILE_SUCCESS,
        USER_DETAILS_RESET,
        USER_LIST_REQUEST,
        USER_LIST_FAIL,
        USER_LIST_SUCCESS,
        USER_LIST_RESET,
        USER_DELETE_REQUEST,
        USER_DELETE_SUCCESS,
        USER_DELETE_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_FAIL,
         } from "../constants/userConstants"
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants"
import axios from "axios"


//login action
export const login =(email,password)=>async(dispatch)=>  {
try {
    dispatch({
        type:USER_LOGIN_REQUEST
    })
    //this where we will pass the token for protected routes send content in headers
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const {data} = await axios.post("/api/users/login" , {email,password},
    config
    )
    //passing data from backend to localstrorage name,email,id,isadmin,token
    dispatch({
        type:USER_LOGIN_SUCCESS,
        payload:data
    })
    localStorage.setItem("userInfo" ,JSON.stringify(data))

} catch (error) {
    dispatch({
        type:USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
}
}

//logout action
export const logout =()=>(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:ORDER_LIST_MY_RESET})
    dispatch({type:USER_LIST_RESET})
}


//register action 

export const register =(name,email,password)=>async(dispatch)=>  {
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post("/api/users" , {name,email,password},
        config
        )
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem("userInfo" ,JSON.stringify(data))
    
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }



//user details action


    export const getUserDetails =(id)=>async(dispatch,getState)=>  {
        try {
            dispatch({
                type:USER_DETAILS_REQUEST
            })
            //distructuring userlogin and get userinfo
            const {userLogin:{userInfo}} =getState()
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${userInfo.token}`

                }
            }
            const {data} = await axios.get(`/api/users/${id}` ,
            config
            )
            dispatch({
                type:USER_DETAILS_SUCCESS,
                payload:data
            })
           
        
        } catch (error) {
            dispatch({
                type:USER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
            })
        }
        }
    
//user update action


export const updateUserProfile =(user)=>async(dispatch,getState)=>  {
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.put(`/api/users/profile` ,
        user,
        config
        )
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })
         //update name in navbar
        dispatch({
            type:USER_LOGIN_SUCCESS ,
            payload:data
        })
        localStorage.setItem("userInfo" ,JSON.stringify(data))
    
    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }

//user list action




export const listUsers =()=>async(dispatch,getState)=>  {
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users` ,
        config
        )
        dispatch({
            type:USER_LIST_SUCCESS ,
            payload:data
        })
    
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }



//delete a user action


export const deleteUser =(id)=>async(dispatch,getState)=>  {
    try {
        dispatch({
            type:USER_DELETE_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}` ,
        config
        )
        dispatch({
            type:USER_DELETE_SUCCESS ,
            //no payload after deleting
        })
    
    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }



// update user action


export const updateUser =(user)=>async(dispatch,getState)=>  {
    try {
        dispatch({
            type:USER_UPDATE_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/${user._id}` ,
        user,
        config
        )
        dispatch({type:USER_UPDATE_SUCCESS })
        dispatch({type:USER_DETAILS_SUCCESS,payload:data })
    
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }


