import { useEffect, useState } from "react"

export default function Home() {
    // 2.1 Hooks Area

    const [businessCategory,setBusinessCategory] =useState([]);
    
        useEffect(()=>{
            fetch(`http://localhost:1337/api/business-categories?populate=*`)
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                console.log(data);
                setBusinessCategory(data.data)
            })
            .catch(()=>{

            });
        },[]);
  return (
            <>
                <h1>Home Page</h1>
                <ul className="nav">
                    {
                        businessCategory.map((cv,idx,arr)=>{
                            return <li key={idx} className="me-3">
                                        <a href="#">
                                            <img src={"http://localhost:1337"+cv.attributes.Image.data.attributes.url}/><br/>
                                           {cv.attributes.Name}
                                        </a>
                                    </li>
                        })
                    }      
                </ul>
            </>
       
  )
}
