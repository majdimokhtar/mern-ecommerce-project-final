import React from 'react';
import { Link } from 'react-router-dom';
import "./Product.css"
import Rating from "./Rating"

function Product({product}) {
  return (
    <div>
      
    <div className="t-div-container-card">
        <div className="t-div-ariel">
          <Link to={`/product/${product._id}`}>
          <img className="t-div-ariel-previewimage" src={product.image} alt={product.name} />
          </Link>
          <div className='card-content'>
          <div className="t-div-ariel-top-meta">
          <Link to={`/product/${product._id}`}>
            <span className="t-div-ariel-subtitle">{product.name}</span>
          </Link>
            <span className="t-div-ariel-title"> {product.brand} </span>
          </div>
          <div className="t-div-ariel-bottom-meta">
            <div className="t-div-ariel-bottom-meta-line"><span className="t-div-ariel-parameter-name" > 
            <Rating value={product.rating} 
            text={`${product.numReviews} reviews`}/> 
            </span><span className="t-div-ariel-parameter-value"></span></div>
            {/* <div className="t-div-ariel-bottom-meta-line"><span className="t-div-ariel-parameter-name">Size:</span><span className="t-div-ariel-parameter-value">45</span></div>
            <div className="t-div-ariel-bottom-meta-line"><span className="t-div-ariel-parameter-name">Color:</span><span className="t-div-ariel-parameter-value">sarcolithic</span></div> */}
            <div className="t-div-ariel-bottom-meta-line t-div-ariel-bottom-meta-line-price">
              {/* <span className="t-div-ariel-parameter-price"> 
              <h4 className="text-capitalize"> Price: </h4>
               </span> */}
               <span className="t-div-ariel-price" 
               style={{color:"#000814" , fontSize:"large" ,fontWeight:"bold"}}> {product.price}DT </span>
               </div>
            
            {/* <button className="t-div-ariel-cart-button"><i className="fa fa-shopping-cart" />  Add to Cart
            </button> */}
          </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Product;