import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import URL from "../../helper/url";

export default function Navigation() {
  //2.1 Hooks Area
  const [logo,setLogo] = useState('');

    useEffect(()=>{
      fetch(`http://localhost:1337/api/website?populate=*`,{})
      .then((res)=>{
          return res.json();
      })
      .then((data)=>{
          console.log("Logodata",data.data.attributes.logo.data.attributes.url);
          setLogo(data.data.attributes.logo.data.attributes.url);
      })
      .catch((error)=>{
         return error;
      })
    },[]);
  const myLogout = () => {
    window.localStorage.removeItem("jwttoken");
    window.location.href = "/login";
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary h-100">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={`${URL}${logo}`}
              width="100"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
              {window.localStorage.getItem("jwttoken") === null && (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                 
                </>
              )}
              {window.localStorage.getItem("jwttoken") !== null && (
                <>
                  <Nav.Link
                    onClick={() => {
                      myLogout();
                    }}
                    className="nav-link"
                  >
                    Logout
                  </Nav.Link>
                  <Link to="/business_register" className="nav-link">Register Business</Link>
                </>
              )}
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
  );
}
