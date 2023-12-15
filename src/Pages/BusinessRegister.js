import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import URL from "../helper/url";
// import state from "sweetalert/typings/modules/state";

const BusinessRegister = () => {
  // Hooks Area
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [businessCategories, SetBusinessCategories] = useState([]);

  useEffect(() => {
    //call the country Api
    fetch(`${URL}/api/countries`, {})
      .then((res) => {
        return res.json();
      })
      .then((countrydata) => {
        console.log("Countrydata", countrydata);
        setCountries(countrydata.data);
      })
      .catch((error) => {
        return error;
      });
    // call the state api
    /*
    fetch(`${URL}/api/states`, {})
      .then((res) => {
        return res.json();
      })
      .then((statedata) => {
        console.log("Statedata", statedata);
        setStates(statedata.data);
      })
      .catch((error) => {
        return error;
      });
      */
    //call the city api
    /*
    fetch(`${URL}/api/cities`, {})
      .then((res) => {
        return res.json();
      })
      .then((citydata) => {
        console.log("Citydata", citydata);
        setCities(citydata.data);
      })
      .catch((error) => {
        return error;
      });
      */
    //call the business category api
    fetch(`${URL}/api/business-categories`, {})
      .then((res) => {
        return res.json();
      })
      .then((categorydata) => {
        console.log("Categorydata", categorydata);
        SetBusinessCategories(categorydata.data);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  const busReg = (event) => {
    event.preventDefault();
    // alert("Okkkk");
    let payload = {
      data: {
        name: document.querySelector('input[name="business_name"]').value,
        business_category: document.querySelector('select[name="bus_cat_id"]')
          .value,
        cities: [document.querySelector('select[name="city_id"]').value],
      },
    };

    // Get the Token from localStorage
    let token = window.localStorage.getItem('jwttoken')
    // call the Api

    console.log(payload);
    fetch(`http://localhost:1337/api/businesses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' +token
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Business Register", data);
        if(data["data"]== null){
            swal(`${data.error.message}, "error`);
            
        }else{
            swal("Good job!", "Business Created Successfully..!", "success");
        }
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStates = (event) => {
    // alert('Ok');

    // console.log(event.target.value);
    let country_id = event.target.value;
    // console.log( country_id);
    //Get the States from country id
    fetch(
      `${URL}/api/states?filters[country][id][$eq]=${country_id}&populate=*`,
      {}
    )
      .then((res) => {
        return res.json();
      })
      .then((statedata) => {
        console.log("Statedata----->", statedata.data);
        setStates(statedata.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCities = (event) => {
    //  alert('Ok');
    //   console.log(event.target.value);
    let state_id = event.target.value;
    // console.log(state_id);
    // Get the Cities from State id
    fetch(
      `http://localhost:1337/api/cities?filters[states][id][$eq]=${state_id}`,
      {}
    )
      .then((res) => {
        return res.json();
      })
      .then((citydata) => {
        console.log("Citydata----->", citydata);
        setCities(citydata.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h1 className="text-center">Business Register</h1>
      <Form className="col-sm-6 offset-3">
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Select
            name="country_id"
            aria-label="Default select example"
            onChange={(event) => {
              getStates(event);
            }}
          >
            {countries.map((cv, idx, arr) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        {
            states.length !== 0 &&
            <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Select
            name="state_id"
            aria-label="Default select example"
            onChange={(event) => {
              getCities(event);
            }}
          >
            {states.map((cv, idx, arr) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        }
            {
            cities.length !== 0 &&
            <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Select name="city_id" aria-label="Default select example">
            {cities.map((cv, idx, arr) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.name}
                </option>
              );
            })}
          </Form.Select>
            </Form.Group>
                
            }
        <Form.Group className="mb-3">
          <Form.Label>Business Category</Form.Label>
          <Form.Select name="bus_cat_id" aria-label="Default select example">
            {businessCategories.map((cv, idx, arr) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.Name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Business Name</Form.Label>
          <Form.Control
            type="text"
            name="business_name"
            placeholder="Enter Business Name"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            busReg(event);
          }}
        >
          Register Business
        </Button>
      </Form>
    </>
  );
};
export default BusinessRegister;
