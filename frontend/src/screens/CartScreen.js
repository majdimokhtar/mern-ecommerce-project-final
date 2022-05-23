import React from 'react'
import { useEffect} from 'react'
import Message from "../components/Message"
import {Link} from "react-router-dom"
import {useSelector , useDispatch} from "react-redux"
import {Row, Col ,Image,ListGroup ,Card ,Form ,Button} from "react-bootstrap"
import {addToCart ,removeFromCart} from "../actions/cartActions"

function CartScreen({match,location,history}) {
    const productId = match.params.id
    // set the quantity number from url after ?qty=number it s stored in local storage
    const qty = location.search ? Number(location.search.split("=")[1]) :1
    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart

   useEffect(() => {
    if (productId) {
        dispatch(addToCart(productId,qty))
    }
   }, [dispatch,productId,qty])
   const removeFromCartHandler=(id)=>{
       dispatch(removeFromCart(id))
   }
   const checkoutHandler=()=>{
       history.push("/login?redirect=shipping")
   }
  return (
      
    <Row>
        <Col md={8}>
        <h1>Shopping Cart</h1>
        {/* if there is no items send this message */}
        {cartItems.length===0 ? <Message>Your Cart is Empty <Link to="/" >  Go Back  </Link></Message> : (
            <ListGroup variant='flush'>
                {cartItems.map(item=>(
    <ListGroup.Item key={item.product}>
        <Row>
            <Col md={2}>
                           {/* brought from cart action */}
                           <Image src={item.image} alt ={item.name} fluid rounded/>
            </Col>
             <Col md={3}>
                           {/* item product is item id  */}
                       <Link to={`/product/${item.product}`} > {item.name} </Link>
            </Col>
                       <Col md={2} > {item.price}DT </Col>
            <Col md={2} > 
                <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, 
                    Number(e.target.value)))}>
                    {/* set the stock quantity with an array the array index start with 0 so we set x+1 */}
                    {[...Array(item.countInStock).keys()].map(x=>(
                      <option key={x+1} value={x+1} > {x+1} </option>
                    ))}
            </Form.Control>
            </Col>
            <Col md={2}>
                <Button type="button" variant="light" onClick={()=>removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>
                </Button>
            </Col>

            </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                {/* set total qty of items tofixed set dicimal number reduce return sum elements in array */}
                <h2>Subtotal({cartItems.reduce((acc, item)=>acc +item.qty,0)}) items</h2>
                {cartItems.reduce((acc, item)=>acc +item.qty*item.price,0)
                .toFixed(2)}DT
                </ListGroup.Item>  
                <ListGroup.Item>
                <Button type="button" className='col-12' disabled={cartItems.length===0} 
                onClick={checkoutHandler}>
                Proceed To Checkout
                </Button>
                </ListGroup.Item>  
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen