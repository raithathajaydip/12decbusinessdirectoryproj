import React from 'react'
import { Button, Form } from 'react-bootstrap'

const BusinessRegister = () => {
  return (
    <>
        <h1 className='text-center'>Business Register</h1>
             <Form className='col-sm-6 offset-3'>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Select aria-label="Default select example">
                        <option>Select City</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Business Category</Form.Label>
                        <Form.Select aria-label="Default select example">
                        <option>Select Business Category</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Business Name" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={()=>{}}>
                        Register Business
                    </Button>
            </Form>
    </>
    )
}
export default BusinessRegister
