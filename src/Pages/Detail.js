import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import URL from '../helper/url';

export default function Detail() {
  //2.1 Hooks Area
  const [searchParams, setSearchParams] = useSearchParams();
   const [busdetail,setBusdetail] =useState([]);
  const [busPhotos,setBusPhotos] =useState([]);
  const[busName,SetBusName]=useState('');
  useEffect(()=>{
    console.log("hotel_id------>",searchParams.get('hotel_id'));
    let hotelId = searchParams.get('hotel_id');
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
        </>
  )
}
