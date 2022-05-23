import React from 'react'
import {useState} from "react"
import "./SearchBox.css"
import {Form} from "react-bootstrap"

function SearchBox({history}) {
    const [keyword, setKeyword] = useState("")
    const submitHandler=(e)=>{
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        else{
            history.push("/")
        }
    }

  return (
    <div>
    <Form className="row domain-search bg-pblue" onSubmit={submitHandler}>
        <div className="container" style={{width:"600px",height:"60px"}}>
            <div className="inside">
            
          <div className="row">
            {/* <div className="col-md-3"> */}
            <div >
            </div>
            <div className="col-md-9">
              <div className="input-group" style={{height:"40px"}}>
                   <input type="search" className="form-control" style={{width:"150px",height:"40px"}}
                   placeholder="Search Products..." 
                   onChange={(e)=>setKeyword(e.target.value)}/> 
                   <span className="input-group-addon">
                       <input type="submit"  defaultValue="Search" className="btn btn-primary" style={{height:"40px"}}/>
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

export default SearchBox