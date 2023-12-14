import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from "sweetalert";
import URL from '../helper/url';


const BusinessRegister = () => {
    // Hooks Area
        const [cities,setCities] =useState([]);
        const [businessCategories,SetBusinessCategories] =useState([]);
       
        useEffect(()=>{
            //call the city api
            fetch(`${URL}/api/cities`,{})
            .then((res)=>{
                    return res.json()
            })
            .then((citydata)=>{
                    console.log("Citydata",citydata)
                    setCities(citydata.data);
            })
            .catch((error)=>{
                return error;
            })
                //call the business category api
                fetch(`${URL}/api/business-categories`,{})
                .then((res)=>{
                    return res.json()
                })
                .then((categorydata)=>{
                        console.log("Categorydata",categorydata);
                         SetBusinessCategories(categorydata.data);
                })
                .catch((error)=>{
                    return error;
                })
        },[])

            const busReg = (event) => {
                event.preventDefault();
               // alert("Okkkk");   
                let payload ={
                                "data": {
                                "name":document.querySelector('input[name="business_name"]').value,
                                "business_category":document.querySelector('select[name="bus_cat_id"]').value,
                                "cities": [
                                    document.querySelector('select[name="city_id"]').value,
                                ]
                                }
                  };
                  // call the Api

                  console.log(payload);
                    fetch(`http://localhost:1337/api/businesses`,{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(payload),
                    })
                    .then((res)=>{
                       return res.json();
                    })
                    .then((data)=>{
                         console.log("Business Register",data);
                        swal("Good job!", "Business Registerd Successfully..!", "success");
                })
                .catch((error)=>{
                    console.log(error);
                })
            }           
  return (
    <>
        <h1 className='text-center'>Business Register</h1>
             <Form className='col-sm-6 offset-3'>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Select name="city_id" aria-label="Default select example">
                            {
                                cities.map((cv,idx,arr)=>{
                                    return <option key={idx} id={cv.id}>{cv.attributes.name}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Business Category</Form.Label>
                        <Form.Select name="bus_cat_id" aria-label="Default select example">
                            {
                                businessCategories.map((cv,idx,arr)=>{
                                    return <option key={idx} id={cv.id}>{cv.attributes.Name}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control type="text" name="business_name" placeholder="Enter Business Name" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={(event)=>{busReg(event)}}>
                        Register Business
                    </Button>
            </Form>
    </>
    )
}
export default BusinessRegister
