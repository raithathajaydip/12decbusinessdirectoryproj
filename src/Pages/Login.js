import React from 'react'
import { Button, Form } from 'react-bootstrap'

export default function Login() {

    const logindata = () => {
       
        let payload = {
            "identifier": document.querySelector('input[type=email]').value,
            "password": document.querySelector('input[type=password]').value,
          }
          console.log(payload);
          fetch(`http://localhost:1337/api/auth/local`,{
            method: "POST",
            headers: {
              "Content-type": "application/json",
              
            },
            body: JSON.stringify(payload),
          })
          .then((res)=>{
                return res.json();
          })
          .then((data)=>{
           
                console.log("Login data",data);
                if(data["jwt"] !==undefined){
                        console.log('token',data["jwt"]);
                       // alert("Welcome");
                       window.location.href='/business_register';

                    // Store The Token In Local Storage
                    window.localStorage.setItem('lang','en');
                    window.localStorage.setItem('langtext','English');
                    window.localStorage.setItem('jwttoken',data["jwt"])
                    window.localStorage.setItem('user_id',data["user"].id)
                }else{
                    alert("Bheed Kam");
                }
          })
          .catch((error)=>{
                console.log(error);
          });
    }
  return (
        <>
              <h1 className='text-center'>Login Page</h1>
             <Form className='col-sm-6 offset-3'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={()=>{logindata()}}>
                    Submit
                    </Button>
            </Form>
        </>
  )
}
