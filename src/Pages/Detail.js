import React, { startTransition, useEffect, useState } from 'react'
import { Button, Carousel, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import URL from '../helper/url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Detail() {
  //2.1 Hooks Area
  const [searchParams, setSearchParams] = useSearchParams();
  const[reviewPayload,setReviewPayload]=useState({
                                                  "data": {
                                                    "ratescale":"",
                                                    "description": "",
                                                    "business": [
                                                      17
                                                    ]
                                                  }
  });
   const [busdetail,setBusdetail] =useState([]);
  const [busPhotos,setBusPhotos] =useState([]);
  const[busName,SetBusName]=useState('');
  useEffect(()=>{
    // const svg = document.querySelector('svg.star');
    // svg.addEventListener('mouseover', () => console.log('Event: mouseover'));

    console.log("hotel_id------>",searchParams.get('id'));
    let hotelId = searchParams.get('id');
    fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=${hotelId}`)
    .then(res=>res.json())
    .then((data)=>{
          console.log("hoteldatabyid",data);
          if(data.data.length > 0){
            SetBusName(data.data[0].attributes.name);
             setBusdetail(data.data);
             if(data.data[0].attributes.Photo.data.length!==null){

               setBusPhotos(data.data[0].attributes.Photo.data);
             }
          }else{
                
          }
    })
    .catch((err=>{
        console.log(err);
    }))
  },[])
    let star = (e)=>{
      
      console.log(e.target.classList);
       let elem = e.target;
      console.log("ElementRating-->",elem.getAttribute("data-rateno"));
     
      setReviewPayload({
          ...reviewPayload,
             data:{
              ...reviewPayload.data,
              ratescale:parseInt(elem.getAttribute("data-rateno")),
              
             
             }
      });
       elem.classList.remove('text-secondary');
       elem.classList.add('text-warning');
    }

    let submitReview = (e) => {
        
        let desc = document.querySelector('textarea.reivew_desc').value;
        console.log("descriptiondata",desc);
        
        setReviewPayload({
          ...reviewPayload,   
          data:{
           ...reviewPayload.data,
           description:desc
          
          }
   });
   console.log("ReviewPayload",reviewPayload);
    }
  return (
        <>
          <h1 className='text-center'>Detail Page</h1>
          <h2 className='text-center text-capitalize'>{busName}</h2>
          <Carousel data-bs-theme="dark" indicators={false} className='w-50 mt-5 carousel-inner' >
                      {
                        busPhotos.map((cv,idx,arr)=>{
                            console.log("Jaydipdata",cv);
                            return <Carousel.Item key={idx}>
                            <img
                              className="d-block w-100"
                              src={URL+cv.attributes.url}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        })
                      }
                   
                          
                  
    </Carousel>
        <Form className='col-6 offset-3'>
              <h1 className='text-center'>Review Detail</h1>
              <Form.Group className="mb-3">
              <Form.Label>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip1" data-rateno="1" onMouseEnter={(e)=>{star(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip2" data-rateno="2" onMouseEnter={(e)=>{star(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip3" data-rateno="3" onMouseEnter={(e)=>{star(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip4" data-rateno="4" onMouseEnter={(e)=>{star(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip5" data-rateno="5" onMouseEnter={(e)=>{star(e)}}/>
              </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Tell About Your Experience</Form.Label>
                  <Form.Control className='reivew_desc' as="textarea" rows={3} />
               </Form.Group>
              </Form.Group>
              <Button variant="primary" type="button" onClick={(e)=>{submitReview(e)}}>
                Submit
              </Button>
              
            </Form>

        </>
  )
}
