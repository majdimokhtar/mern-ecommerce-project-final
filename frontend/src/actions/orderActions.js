import {ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL} from "../constants/orderConstants"
    import axios from "axios"

//create order action and get user info
    export const createOrder =(order)=>async(dispatch,getState)=>  {
        try {
            dispatch({
                type:ORDER_CREATE_REQUEST
            })
            const {userLogin:{userInfo}} =getState()
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${userInfo.token}`
    
                }
            }
            const {data} = await axios.post(`/api/orders`,order,config)
            dispatch({
                type:ORDER_CREATE_SUCCESS,
                payload:data
            })
        
        } catch (error) {
            dispatch({
                type:ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
            })
        }
        }
    //get order details by id
        export const getOrderDetails =(id)=>async(dispatch,getState)=>  {
            try {
                dispatch({
                    type:ORDER_DETAILS_REQUEST
                })
                const {userLogin:{userInfo}} =getState()
                const config={
                    headers:{
                        //it s a get request we dont need content type
                        Authorization:`Bearer ${userInfo.token}`
        
                    }
                }
                const {data} = await axios.get(`/api/orders/${id}` ,
                config
                )
                dispatch({
                    type:ORDER_DETAILS_SUCCESS,
                    payload:data
                })
                // localStorage.setItem("userInfo" ,JSON.stringify(data))
            
            } catch (error) {
                dispatch({
                    type:ORDER_DETAILS_FAIL,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
            }
        

//order pay action

        export const payOrder =(orderId,paymentResult)=>async(dispatch,getState)=>  {
            try {
                dispatch({
                    type:ORDER_PAY_REQUEST
                })
                const {userLogin:{userInfo}} =getState()
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${userInfo.token}`
                    }
                }
                const {data} = await axios.put(`/api/orders/${orderId}/pay` ,
                paymentResult,
                config
                )
                dispatch({
                    type:ORDER_PAY_SUCCESS,
                    payload:data
                })
            
            } catch (error) {
                dispatch({
                    type:ORDER_PAY_FAIL,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
            }
        


//order deliver action

export const deliverOrder =(order)=>async(dispatch,getState)=>  {
    try {
        dispatch({
            type:ORDER_DELIVER_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/${order._id}/deliver` ,{},
        config
        )
        dispatch({
            type:ORDER_DELIVER_SUCCESS,
            payload:data
        })
    
    } catch (error) {
        dispatch({
            type:ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }









//list my order action

        export const listMyOrders =()=>async(dispatch,getState)=>  {
            try {
                dispatch({
                    type:ORDER_LIST_MY_REQUEST
                })
                const {userLogin:{userInfo}} =getState()
                const config={
                    headers:{
                        Authorization:`Bearer ${userInfo.token}`
                    }
                }
                const {data} = await axios.get(`/api/orders/myorders`,
                config
                )
                dispatch({
                    type:ORDER_LIST_MY_SUCCESS,
                    payload:data
                })
            
            } catch (error) {
                dispatch({
                    type:ORDER_LIST_MY_FAIL,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
            }
        


//Order list action
export const listOrders =()=>async(dispatch,getState)=>  {
    try {
        dispatch({
            type:ORDER_LIST_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders`,
        config
        )
        dispatch({
            type:ORDER_LIST_SUCCESS,
            payload:data
        })
    
    } catch (error) {
        dispatch({
            type:ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }


