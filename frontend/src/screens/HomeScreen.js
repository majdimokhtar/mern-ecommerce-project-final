import React from 'react';
import {useDispatch ,useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { useEffect } from 'react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import {listProducts} from "../actions/productActions"
import ProductCarousel from '../components/ProductCarousel';
import {Col , Row} from "react-bootstrap"
import NewsletterSearchbox from "../components/NewsletterSearchbox"


function HomeScreen({match}) {
  const keyword = match.params.keyword
  
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  //grab it from state and pull out err, loading, products
  const productList=useSelector(state=>state.productList)
  const {Loading,error,products ,pages,page}=productList
  
  // useeffect fetching data after loading
  //fetching product cards from back end
  //dispatching the action to get products send it through reducer
  useEffect(()=>{
    dispatch(listProducts(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])



  return (
    <>
      {!keyword ? <ProductCarousel/> : <Link to="/" className='btn btn-light'>Go Back</Link> }
      <h1 className='text-center' style={{marginTop:"20px"}}><span id="latest">Latest</span><span id='products'> Products</span></h1>
    {Loading? <Loader /> :error? <Message variant="danger"> {error}  </Message> :
    <>
    <div className='cardscontainer'>
    {/* mapping products cards */}
   {products.map((product)=>(
     <div key={product._id}>
       
       <Product product={product} />
       </div>
     
   ))}
   </div>
   <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
   </>
    }
    
    <div className='newsletter' 
    style={{backgroundColor:"#0096c7" ,
    color:"#fdfffc",
     width:"100vw" ,
     height: "200px",
     marginLeft:"-133px",
     marginTop:"150px",
     marginBottom:"-10px",
     padding: "50px",
     bottom:"0"}}>
    <Row>
       <Col md={5}>
      <h2 style={{marginLeft:"50px" ,
    color:"#fdfffc"}}>
      Join our newsletter and get 20% off</h2>
      <p style={{marginLeft:"50px",
                color:"#fdfffc",
                fontSize:"large"}}>
                Sign up for newsletter and stay up to date</p>
    </Col>
    <Col md={6} >
      <div style={{marginLeft:"50px",display:"flex"}}>
    <NewsletterSearchbox />
    </div>
    </Col>
    </Row>
    </div>
    
    
    
    </>
  )
}

export default HomeScreen