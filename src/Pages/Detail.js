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
                                                    "business": '',
                                                    "users_permissions_users": [
                                                      ""
                                                    ],
                                                    
                                                  }
  });
   const [busdetail,setBusdetail] =useState([]);
  const [busPhotos,setBusPhotos] =useState([]);
  const[busName,SetBusName]=useState('');
  useEffect(()=>{
    // const svg = document.querySelector('svg.star');
    // svg.addEventListener('mouseover', () => console.log('Event: mouseover'));
     
        setReviewPayload({
          ...reviewPayload,
          data:{
            ...reviewPayload.data,
            users_permissions_users: parseInt(window.localStorage.getItem('user_id'))
           } 
        })
     
    console.log("business_id------>",searchParams.get('business_id'));
    let businessId = parseInt(searchParams.get('business_id'));
    fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=${businessId}`)
    .then(res=>res.json())
    .then((data)=>{
          console.log("hoteldatabyid",data);
          if(data.data.length > 0){
            SetBusName(data.data[0].attributes.name);
             setBusdetail(data.data);
             setBusPhotos(data.data[0].attributes.Photo.data);              
             }
         
    })
    .catch((err=>{
        console.log(err);
    }))
  },[])
  function matches(elem, filter) {
    if (elem && elem.nodeType === 1) {
      if (filter) {
        return elem.matches(filter);
      }
      return true;
    }
    return false;
  }
  function getPreviousSiblings(elem, filter) {
    var sibs = [];
    while (elem = elem.previousSibling) {
      if (matches(elem, filter)) {
        sibs.push(elem);
      }
    }
    return sibs;
  }

  function getAllSiblings(elem, filter) {
    var sibs = [];
    elem = elem.parentNode.firstChild;
    while (elem = elem.nextSibling) {
      if (matches(elem, filter)) {
        sibs.push(elem);
      }
    } 
    return sibs;
  }
    let star = (e)=>{
    let elem = e.target;
    var arr = getPreviousSiblings(elem, 'svg.fa-star');
      // console.log("Indexdata",arr.length);
      arr.forEach(element=>{
            console.log("ElementData",element);
            element.classList.remove('text-secondary');
            element.classList.add('text-warning');
      })
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
    const star2 = (e) => {
      let elem = e.target;
      var allSibs = getAllSiblings(elem, 'svg.fa-star');   
      console.log("AllSiblings",allSibs);
        allSibs.forEach(element=>{
        console.log("Allelemetntdata",element);
        element.classList.remove('text-warning');
        element.classList.add('text-secondary');       
  })
          
    }
    let submitReview = (e) => {
        
        // let desc = document.querySelector('textarea.reivew_desc').value;
        // console.log("descriptiondata",desc);
        
  //       setReviewPayload({
  //         ...reviewPayload,   
  //         data:{
  //          ...reviewPayload.data,
  //          description:desc
  //         }
  //  });
  //  console.log("ReviewPayload",reviewPayload);

  fetch(`${URL}/api/reviews`,{
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization" :"Bearer "+window.localStorage.getItem('jwttoken')
    },
    body: JSON.stringify(reviewPayload),
  })
  .then((res)=>{
        return res.json();
  })
  .then((data)=>{
        console.log("Detail Data",data);
  })
  .catch((error)=>{
        console.log(error);
  })
    }
    const handleSubmit = (value) => {
      let businessId = parseInt(searchParams.get('business_id'));
      setReviewPayload({
        ...reviewPayload,   
        data:{
         ...reviewPayload.data,
         business:businessId,
         description:value
        }
 });
      
  }
  return (
        <>
          <h1 className='text-center'>Detail Page</h1>
          <h2 className='text-center text-capitalize'>{busName}</h2>
          <Carousel data-bs-theme="dark" indicators={false} className='w-50 mt-5 carousel-inner' >
                      {
                     busPhotos && busPhotos.map((cv,idx,arr)=>{
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
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip1" data-rateno="1" onMouseEnter={(e)=>{star(e)}} onMouseLeave={(e)=>{star2(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip2" data-rateno="2" onMouseEnter={(e)=>{star(e)}} onMouseLeave={(e)=>{star2(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip3" data-rateno="3" onMouseEnter={(e)=>{star(e)}} onMouseLeave={(e)=>{star2(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip4" data-rateno="4" onMouseEnter={(e)=>{star(e)}} onMouseLeave={(e)=>{star2(e)}}/>
              <FontAwesomeIcon icon={faStar}className="text-secondary fs-1 jaydip5" data-rateno="5" onMouseEnter={(e)=>{star(e)}} onMouseLeave={(e)=>{star2(e)}}/>
              </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Tell About Your Experience</Form.Label>
                  <Form.Control className='reivew_desc'   as="textarea" rows={3} onChange={e => handleSubmit(e.target.value)} />
               </Form.Group>
              </Form.Group>
              <Button variant="primary" type="button" onClick={(e)=>{submitReview(e)}}>
                Submit
              </Button>
            </Form>

        </>
  )
}
