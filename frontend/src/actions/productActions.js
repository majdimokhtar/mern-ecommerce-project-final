import {PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL} from "../constants/productConstants"
import axios from "axios"



//redux thunk make us add fct within fct
    export const listProducts = (keyword="",pageNumber="") => async (dispatch)=> {
        try {
            dispatch({type:PRODUCT_LIST_REQUEST})
            const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
//products filled with data
            dispatch({type:PRODUCT_LIST_SUCCESS,
            payload:data
            })
        } catch (error) {
//custom message
            dispatch({
                type:PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
            })
        }

    }

    export const listProductDetails = (id) => async (dispatch) => {
        try {
          dispatch({ type: PRODUCT_DETAILS_REQUEST })
      
          const { data } = await axios.get(`/api/products/${id}`)
      
          dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
          })
        } catch (error) {
          dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        }
      }


//product delete action
      export const deleteProduct =(id)=>async(dispatch,getState)=>  {
        try {
            dispatch({
                type:PRODUCT_DELETE_REQUEST
            })
            const {userLogin:{userInfo}} =getState()
            const config={
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            await axios.delete(`/api/products/${id}`,
            config
            )
            dispatch({
                type:PRODUCT_DELETE_SUCCESS,
                
            })
        
        } catch (error) {
            dispatch({
                type:PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
            })
        }
        }
    


//product create action
      export const createProduct =()=>async(dispatch,getState)=>  { 
        try {
            dispatch({
                type:PRODUCT_CREATE_REQUEST
            })
            const {userLogin:{userInfo}} =getState()
            const config={
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            //we are making a post request but with no data {}
            const {data} =  await axios.post(`/api/products`,{},
            config
            )
            dispatch({
                type:PRODUCT_CREATE_SUCCESS,
                payload:data
            })
        
        } catch (error) {
            dispatch({
                type:PRODUCT_CREATE_FAIL,
                payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
            })
        }
        }
    

//product update action
export const updateProduct =(product)=>async(dispatch,getState)=>  { 
    try {
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        
        const {data} =  await axios.put(`/api/products/${product._id}`,product,
        config
        )
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data
        })
    
    } catch (error) {
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }




//product review action
export const createProductReview =(productId,review)=>async(dispatch,getState)=>  { 
    try {
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        
        await axios.post(`/api/products/${productId}/reviews`,review,
        config
        )
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS,
            
        })
    
    } catch (error) {
        dispatch({
            type:PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
    }




//top rated action


export const listTopProducts = () => async (dispatch)=> {
    try {
        dispatch({type:PRODUCT_TOP_REQUEST})
        const {data} = await axios.get(`/api/products/top`)

        dispatch({type:PRODUCT_TOP_SUCCESS,
        payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }

}
