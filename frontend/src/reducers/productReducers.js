import {PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAIL,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,
        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAIL,
        PRODUCT_CREATE_REQUEST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_CREATE_RESET,
        PRODUCT_UPDATE_REQUEST,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_FAIL,
        PRODUCT_UPDATE_RESET,
        PRODUCT_CREATE_REVIEW_REQUEST,
        PRODUCT_CREATE_REVIEW_SUCCESS,
        PRODUCT_CREATE_REVIEW_FAIL,
        PRODUCT_CREATE_REVIEW_RESET,
        PRODUCT_TOP_REQUEST,
        PRODUCT_TOP_SUCCESS,
        PRODUCT_TOP_FAIL} from "../constants/productConstants"


export const productListReducer = (state={products:[]},action)=>{
    switch (action.type) {
        // loading products
        case PRODUCT_LIST_REQUEST: 
         return{
             Loading:true, products: []
         }
        //  filling product filled in state after done loading
         case PRODUCT_LIST_SUCCESS: 
         return{
            Loading:false ,
            products:action.payload.products,
            pages:action.payload.pages,
            page:action.payload.page
        }
        // setting error to the state
        case PRODUCT_LIST_FAIL: 
         return{
            Loading:false ,error:action.payload
        }
    
        default:
            return state
    }

}


// reducer fetching one product detail:
export const productDetailsReducer = (
    state = { product: { reviews: [] } },action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { ...state, 
                Loading: true }
      case PRODUCT_DETAILS_SUCCESS:
        return { Loading: false, 
                product: action.payload }
      case PRODUCT_DETAILS_FAIL:
        return { Loading: false,
                error: action.payload }
      default:
        return state
    }
  }


  // product delete reducer
export const productDeleteReducer = (state = {},action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { Loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { Loading: false, 
              success:true }
    case PRODUCT_DELETE_FAIL:
      return { Loading: false,
              error: action.payload }
    default:
      return state
  }
}



// product create reducer
export const productCreateReducer = (state = {},action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { Loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { Loading: false, 
              success:true, product:action.payload }
    case PRODUCT_CREATE_FAIL:
      return { Loading: false,
              error: action.payload }
    case PRODUCT_CREATE_RESET:
                return {}
    default:
      return state
  }
}



// product update reducer
export const productUpdateReducer = (state = {product:{}},action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { Loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { Loading: false, 
              success:true, product:action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { Loading: false,
              error: action.payload }
    case PRODUCT_UPDATE_RESET:
                return {product:{}}
    default:
      return state
  }
}


// product review reducer
export const productReviewCreateReducer = (state = {},action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { Loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { Loading: false, 
              success:true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { Loading: false,
              error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
                return {}
    default:
      return state
  }
}




// product top reviewed reducer
export const productTopRatedReducer = (state = {products:[] },action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { Loading: true,products:[] }
    case PRODUCT_TOP_SUCCESS:
      return { Loading: false, 
              products:action.payload }
    case PRODUCT_TOP_FAIL:
      return { Loading: false,
              error: action.payload }

    default:
      return state
  }
}