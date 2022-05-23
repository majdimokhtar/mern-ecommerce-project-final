import React,{useState} from 'react'
import{Form, Button ,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import {savePaymentMethod} from "../actions/cartActions"


function PaymentScreen({history}) {
  const cart =useSelector(state=>state.cart)
  const {shippingAddress} =cart
  if (!shippingAddress) {
      history.push("/shipping")
  }

  //fill if it s in localstorage
  const [paymentMethod, setPaymentMethod] = useState("Paypal")
  const dispatch=useDispatch()

  const submitHandler = (e) =>{
  e.preventDefault()
  dispatch(savePaymentMethod(paymentMethod))
  history.push("/placeorder")
  }



  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
    <h1>Payment Method</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group>
        <Form.Label as="legend">
            Select Method
        </Form.Label>
        <Col>
        <Form.Check type='radio' label="Paypal or Credit Card" 
        id='Paypal' name='paymentMethod' value="Paypal" checked
        onChange={(e)=>setPaymentMethod(e.target.value)}>
        </Form.Check>
        
        {/* <Form.Check type='radio' label="e-DINAR or Credit Card" 
        id='e-DINAR' name='paymentMethod' value="e-DINAR"
        onChange={(e)=>setPaymentMethod(e.target.value)}>
        </Form.Check> */}
        
        </Col>
    </Form.Group>
        <Button type='submit' variant='primary'> Continue </Button>

    </Form>
    </FormContainer>
  )
}

export default PaymentScreen


