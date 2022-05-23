import React from 'react'
import "./NewsletterSearchbox.css"
import {Form} from "react-bootstrap"

function NewsletterSearchbox() {
  return (

        <div>
    <Form className="row domain-search bg-pblue" >
        <div className="container" style={{width:"800px",height:"60px"}}>
            <div className="inside">
            
          <div className="row">
            {/* <div className="col-md-3"> */}
            <div >
            </div>
            <div className="col-md-9">
              <div className="input-group" style={{height:"40px"}}>
                   <input type="search" className="form-control" style={{width:"150px",height:"40px"}}
                   placeholder="Enter Email..." /> 
                   <span className="input-group-addon">
                       <input type="submit"  defaultValue="Search" className="btn btn-secondary" style={{height:"40px"}}/>
                       </span> 
                       </div>
            </div>
          </div>
          </div>


        </div>
      </Form>
    </div>
  )
}

export default NewsletterSearchbox