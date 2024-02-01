import React, { useEffect, useState } from "react";

import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import URL from "../../helper/url";

export default function Navigation() {
  //2.1 Hooks Area

  const [logo, setLogo] = useState("");
  const [address, setAddress] = useState("");
  
  // Function defination Area
  const directLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  };
  const showPosition = (position) => {
    // setAddress( "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude);
    // setAddress(`Latitue: ${position.coords.latitude} Longitute:${position.coords.longitude}`);
    window.localStorage.setItem('address','Pntc 12,floor');
    setAddress("Pntc 12,floor");
  };
        useEffect(() => {
          fetch(`http://localhost:1337/api/website?populate=*`, {})
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("Logodata", data.data.attributes.logo.data.attributes.url);
              setLogo(data.data.attributes.logo.data.attributes.url);
            })
            .catch((error) => {
              return error;
            });
        }, []);
        const myLogout = () => {
            window.localStorage.clear();
            window.location.href = "/login";
          };

        const language = (e) => {
             console.log(e.target.innerHTML);
            let x = e.target.innerHTML
            if(x==="English"){
                  console.log("Hindi")
                  e.target.innerHTML="Hindi"
                  window.localStorage.setItem('lang','hi');
                  window.localStorage.setItem('langtext','Hindi');
                  window.location.reload();
            }else{
              console.log("english");
              e.target.innerHTML="English"
              window.localStorage.setItem('lang','en');
              window.localStorage.setItem('langtext','English');
              window.location.reload();
            }       
        }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary h-100">
        <Container fluid>
          <Link to="/">
            <img
              src={`${URL}${logo}`}
              width="100"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
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
              {
                <Nav.Link
                onClick={(e) => {language(e)}} className="nav-link">{window.localStorage.getItem('langtext')}</Nav.Link>
              }
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
                  <Link to="/business_register" className="nav-link">
                    RegisterBusiness
                  </Link>

                  <button
                    type="submit"
                    className="btn btn-success p-0"
                    onClick={(e) => {
                      directLocation(e);
                    }}
                  >
                    <Link to="" className="nav-link text-white">
                       Location
                    </Link>
                  </button>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      readOnly
                      disabled
                      value={address}
                      className="ms-2"
                      aria-label="Search"
                    />
                  </Form>
                </>
              )}
            </Nav>
            <Form className="d-flex ms-2" >
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
