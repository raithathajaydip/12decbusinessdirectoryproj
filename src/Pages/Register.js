import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert';
export default function Register() {
    const [payload,setpayload] = useState({
      "username":'',
      "password":'',
      "email":''

    })
  const registerUser =()=>{
        const n = document.querySelector('input[name=username]').value;
        const e = document.querySelector('input[name=email]').value;
        const p = document.querySelector('input[name=password]').value;    
        fetch(`http://localhost:1337/api/auth/local/register`,{
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
                      },
            body: JSON.stringify({
              "username":n,
              "email":e,
              "password":p
            })
          })
          .then((res)=>{

                return res.json();  
          })
          .then((data)=>{

                  if(data.data === null){
                    swal("Bad job!", "User Not Created Successfully!", "error");
                  }else{
                    swal("Good job!", "User Created Successfully!", "success");
                  }  
          })
          .catch((error)=>{
              console.log(error);
          });  
  }
    
  return (
      <>
         <h1 className='text-center'>Register Page</h1> 
        <Form className='col-sm-6 offset-3'>
              <Form.Group className="mb-3" >
              <Form.Label>UserName</Form.Label>
              <Form.Control name="username" type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="button" onClick={()=>{registerUser()}}>
                Submit
              </Button>
      </Form>
      </>
  )
}
