import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import  Logo from "../../logo.svg";
import { Link } from 'react-router-dom';
export default function Navigation() {

  const myLogout = () => {
     window.localStorage.removeItem('jwttoken')
    window.location.href='/login';
  }
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary h-100">
            <Container fluid>
              <Navbar.Brand href="#">
                  <img
                  src={Logo}
                  width="100"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                 />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  
                  <Link to="/" className='nav-link'>Home</Link>
                  {
                    window.localStorage.getItem('jwttoken') === null &&
                    <>
                    <Link to="/login" className='nav-link'>Login</Link>
                    <Link to="/register" className='nav-link'>Register</Link>
                    </>
                  }
                  {
                     window.localStorage.getItem('jwttoken') !== null &&
                    <>
                    <Nav.Link onClick={()=>{myLogout()}} className='nav-link'>Logout</Nav.Link>
                    </>
                  }
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}
