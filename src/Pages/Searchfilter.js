import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Dropdown, ListGroup, Modal, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate, useSearchParams } from "react-router-dom";
import URL from "../helper/url";
import img from '../assets/img/1.jpg';

const Searchfilter = () => {
  //2.1 Hooks area
  const [businesses, SetBusinesses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [star,setStar] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate =useNavigate([])
              
              
  //2.2 Function Defination Area

  useEffect(() => {
    let lang = window.localStorage.getItem("lang");
    // console.log("Cat_name------>",searchParams.get('cat_name'));
    fetch(
      `${URL}/api/businesses?locale=${lang}&populate=*&filters[business_categories][Name][$containsi]=${searchParams.get(
        "cat_name"
      )}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Businessdata",data.data);
        SetBusinesses(data.data);
        for(let i=1; i< data.data.attributes.star; i++){
            setStar([...star,<FontAwesomeIcon icon={faStar}className="text-warning"/>])
        }
        setStar(data.data.attributes.star);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const GetBusinessByRating = (e) => {
   console.log(e.target.getAttribute("data-star"));
   let star = e.target.getAttribute("data-star");
   fetch(`http://localhost:1337/api/businesses?lang=en&populate=*&filters[business_categories][name][$containsi]=Hotels&filters[star][$eq]=${star}`)
   .then((res)=>{
          return res.json();
   })
   .then((data)=>{
      console.log("Business Rateing",data.data[0].attributes.star);
       SetBusinesses(data.data);
   })
   .catch((error)=>{
      return error;
   })
  }
  return (
    <>
      <Row>
          <Col sm={12} className="mt-4 mb-4">
        <Dropdown className="float-start">
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Ratings
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item data-star="5" onClick={(e)=>{GetBusinessByRating(e)}}>5 Ratings</Dropdown.Item>
        <Dropdown.Item data-star="4" onClick={(e)=>{GetBusinessByRating(e)}}>4 Ratings</Dropdown.Item>
        <Dropdown.Item data-star="3" onClick={(e)=>{GetBusinessByRating(e)}}>3 Ratings</Dropdown.Item>
        <Dropdown.Item data-star="2" onClick={(e)=>{GetBusinessByRating(e)}}>2 Ratings</Dropdown.Item>
        <Dropdown.Item data-star="1" onClick={(e)=>{GetBusinessByRating(e)}}>1 Ratings</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown >
    <Dropdown className="float-start ms-2" >
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Price
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">High To Low</Dropdown.Item>
        <Dropdown.Item href="#/action-1">Low To High</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Button variant="light" className="float-end"onClick={handleShow}>All Filters</Button>
    <Modal size="lg"  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>All Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              <h3>Star Rateing</h3>
              <Button variant="light"  data-star="5" onClick={(e)=>{GetBusinessByRating(e)}}>5 Star</Button>{' '}
              <Button variant="light"  data-star="4" onClick={(e)=>{GetBusinessByRating(e)}}>4 Star</Button>{' '}
              <Button variant="light"  data-star="3" onClick={(e)=>{GetBusinessByRating(e)}}>3 Star</Button>{' '}
              <Button variant="light"  data-star="2" onClick={(e)=>{GetBusinessByRating(e)}}>2 Star</Button>{' '}
              <Button variant="light"  data-star="1" onClick={(e)=>{GetBusinessByRating(e)}}>1 Star</Button>{' '}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          </Col>
      </Row>
      <Row>
        <Col sm={9}>
            {
               businesses && businesses.map((cv,idx,arr)=>{
                return  <Card key={idx}className="p-3 mb-3" onClick={()=>{navigate("/detail?business_id="+cv.id)}}>         
                <Row>
                  <Col sm={3}>
                  {console.log("Cvv---->",cv)}
                  <Card.Img
                      variant="top"
                      style={{ width: "18rem" }}
                      className="img-fluid"            
                      src={(cv.attributes.Photo.data!==null)?URL +cv.attributes.Photo.data[0].attributes.url:img}
                    />
                  </Col>
                  <Col sm={9}>
                    <Card.Body>
                      <Card.Title>{cv.attributes.name}</Card.Title>
                      <Badge bg="success" className="p-2">
                        {cv.attributes.star}
                      </Badge>
                      <span>
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </span>
                      <span>
                         {
                          star.map((cv2,idx2,arr2)=>{
                            return cv2;
                         })
                         }
                      </span>
                      <span className="ms-1">{cv.attributes.star} Ratings</span>
                      <Card.Text>{cv.attributes.desc}</Card.Text>
                      <a href={"tel:"+cv.attributes.phone} className="btn btn-success"onClick={(e)=>{e.stopPropagation()}}>{'91-' + cv.attributes.phone}</a>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
             
              })
            }
        </Col>
        <Col sm={3}>
          <Card>
            <Card.Header>Featured</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Searchfilter;
