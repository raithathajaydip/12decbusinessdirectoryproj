import React, { useEffect, useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "react-router-dom";
import URL from "../helper/url";
import img from '../assets/img/1.jpg';

const Searchfilter = () => {
  //2.1 Hooks area
  const [businesses, SetBusinesses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [star,setStar] = useState([]);
              
              
  //2.2 Function Defination Area

  useEffect(() => {
    // console.log("Cat_name------>",searchParams.get('cat_name'));
    fetch(
      `${URL}/api/businesses?populate=*&filters[business_categories][Name][$containsi]=${searchParams.get(
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

  return (
    <>
      <h1 className="text-center">Searchfilter</h1>
      <Row>
        <Col sm={9}>
            {
              businesses.map((cv,idx,arr)=>{
                return  <Link key={idx} to={"/detail?business_id="+cv.id}>
                    <Card  className="p-3 mb-3">      
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
                        3.9
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
                      <span className="ms-1">4 Rateing</span>
                      <Card.Text>{cv.attributes.desc}</Card.Text>
                      <a href={"tel:"+cv.attributes.phone} className="btn btn-success"onClick={(e)=>{e.stopPropagation()}}>{'91-' + cv.attributes.phone}</a>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              </Link>
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
