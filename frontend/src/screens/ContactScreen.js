import React,{useState,useRef} from 'react'
import{Image,Form, Button, Col ,Row} from "react-bootstrap"
import emailjs from '@emailjs/browser';




function ContactScreen({location,history}) {
const formRef=useRef();
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [subject, steSubject] = useState("")
const [message, setMessage] = useState(false)

const handReset = () =>{
    setName("")
    setEmail("")
    steSubject("")
}
//handlesubmit

const handleSubmit=(e)=> {
    e.preventDefault();

    setMessage(true);
    emailjs.sendForm(
      "service_kl5z8rw", 
      "template_xofhkjk", 
      formRef.current, 
      "user_F54SNrzxMUzCdJ12nt7zf")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset()
    handReset()
  }


  return (
      
    <Row>
        <Col md={5} className="update"   >
        <h2>Contact Us</h2>
    <Form onSubmit={handleSubmit} ref={formRef}>

    <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter name' name="user_name" value={name} onChange={(e)=>setName(e.target.value)}
             required minLength="3" maxLength="100">
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Adress</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' name="user_email" value={email} onChange={(e)=>setEmail(e.target.value)} 
            required>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='subject'>
            <Form.Label>Subject</Form.Label>
            <Form.Control type='subject' placeholder='Enter Subject' name="user_subject" value={subject} onChange={(e)=>steSubject(e.target.value)} 
            required
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='message'>
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" row="10" style={{height:"200px"}} 
                  placeholder='Enter Message...'
                  name="message"
                  required 
                  minLength="3" maxLength="100"
                  ></Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit' style={{marginTop:"10px",marginBottom:"20px"}} >Send</Button>
        {message && <span style={{color:"#40916c",marginLeft:"10px",fontWeight:"700"}}>Thanks, I'll reply ASAP</span> }
        

    </Form>
    </Col>
    <Col>
    <Image src='/images/contactus.svg' className='svgimage' />
    </Col>
    
    
    </Row>
  )
}

export default ContactScreen