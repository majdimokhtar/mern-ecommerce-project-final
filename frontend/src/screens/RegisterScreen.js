import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import{Form, Button, Col ,Row} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import {register} from "../actions/userActions"



function RegisterScreen({location,history}) {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [message, setMessage] = useState(null)

const dispatch =useDispatch()
const userRegister=useSelector(state=>state.userRegister)
const {Loading , error ,userInfo} = userRegister

const redirect = location.search ? location.search.split("=")[1] :"/"
useEffect(() => {
  if(userInfo){
    history.push(redirect)
  }
}, [history,userInfo,redirect])


const submitHandler = (e)=>{
     e.preventDefault()
     if (password!== confirmPassword) {
         setMessage("Password do not match")
     }
    else{
        dispatch(register(name,email,password))
    }
    }
     

  return (
    <FormContainer>
    <h1>Sign Up</h1>
    {message && <Message variant="danger"> {message} </Message>}
    {error && <Message variant="danger"> {error} </Message>}
    {Loading && <Loader/>}
    <Form onSubmit={submitHandler}>

    <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}
            required minlength="3" maxlength="100" name="name"
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Adress</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}
            required name="email"
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} 
            required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            title="Please include 1 uppercase character 1 lowercase character , and 1 number"
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} 
            required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            >
            </Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit' >Register</Button>

    </Form>
    <Row className='py-3'>
    <Col>Have an Account? <Link to={redirect? `/login?redirect=${redirect}`: "/login"} >Login</Link>
    </Col>    
    </Row>
    </FormContainer>
  )
}

export default RegisterScreen