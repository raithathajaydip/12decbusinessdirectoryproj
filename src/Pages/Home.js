// Import Area
import { useEffect, useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import URL from "../helper/url";

export default function Home() {
  // 2.1 Hooks Area

  const [businessCategory, setBusinessCategory] = useState([]);
  const [mainslider, setMainSlider] = useState([]);
  // 2.2 Function Defination Area
  useEffect(() => {
    let lang = window.localStorage.getItem('lang');
    console.log("Language",lang);
    fetch(`${URL}/api/business-categories?locale=${lang}&populate=*`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBusinessCategory(data.data);
      })
      .catch(() => {});

      fetch(`http://localhost:1337/api/website-freontend?populate[MainSliderCom][populate]=*`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Sliderdata====>",data.data);
        setMainSlider(data.data.attributes.MainSliderCom);
      })
      .catch(() => {});
  }, []);

  //2.3 Return Area
  return (
    <>
      <h1>Home Page</h1>
      <Row>
        <Col xs={6}>
          <Carousel data-bs-theme="dark" className="mb-5">
           {
            mainslider && mainslider.map((cv,idx,arr)=>{
                console.log("Cv data====>>",cv.business_categories.data[0].attributes.Name);
                return <Carousel.Item key={idx}>
                  <Link to={"/search?cat_name=" + cv.business_categories.data[0].attributes.Name}>
                      <img
                        className="d-block w-100"
                        src={URL+cv.image.data.attributes.url}
                        alt="First slide"
                      />
                  </Link>
              </Carousel.Item>
            })
           }
            
          </Carousel>
        </Col>
      </Row>
      <ul className="nav">
        {businessCategory.map((cv, idx, arr) => {
          return (
            <li key={idx} className="me-3">
              <Link to={"/search?cat_name=" + cv.attributes.Name}>
                <img
                  src={
                    "http://localhost:1337" +
                    cv.attributes.Image.data.attributes.url
                  }
                />
                <br />
                {cv.attributes.Name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
