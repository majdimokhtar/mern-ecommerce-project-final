import React from 'react'
import {Nav} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"

function CheckoutSteps({step1,step2,step3,step4}) {
  return (
    <Nav className='d-flex justify-content-evenly mx-auto' id='shipping'>
    <Nav.Item>
        {step1 ? (
            <LinkContainer to="/login" style={{color:"#000814"}}>
                <Nav.Link ><i className="fa-solid fa-right-to-bracket"></i>Sign In</Nav.Link>
            </LinkContainer>
        ) : (<Nav.Link disabled><i className="fa-solid fa-right-to-bracket"></i>Sign In</Nav.Link> )}
    </Nav.Item>

    <Nav.Item>
        {step2 ? (
            <LinkContainer to="/shipping" style={{color:"#000814"}}>
                <Nav.Link><i className="fa-solid fa-truck-fast"></i>Shipping</Nav.Link>
            </LinkContainer>
        ) : (<Nav.Link disabled><i className="fa-solid fa-truck-fast"></i>Shipping</Nav.Link> )}
    </Nav.Item>

    <Nav.Item>
        {step3 ? (
            <LinkContainer to="/payment" style={{color:"#000814"}}>
                <Nav.Link><i className="fa fa-credit-card"></i>Payment</Nav.Link>
            </LinkContainer>
        ) : (<Nav.Link disabled><i className="fa fa-credit-card"></i>Payment</Nav.Link> )}
    </Nav.Item>

    <Nav.Item>
        {step4 ? (
            <LinkContainer to="/placeorder" style={{color:"#000814"}}>
                <Nav.Link><i className="fa-solid fa-square-check"></i>Place Order</Nav.Link>
            </LinkContainer>
        ) : (<Nav.Link disabled><i className="fa-solid fa-square-check"></i>Place Order</Nav.Link> )}
    </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps