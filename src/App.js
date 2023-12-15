import React from "react";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import Detail from "./Pages/Detail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Layout from "./component/ui/Layout";
import BusinessRegister from "./Pages/BusinessRegister";

export default function App() {
  if (window.localStorage.getItem("jwttoken") === null) {
    return (
      <>
        <Login />
      </>
    );
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="detail" element={<Detail />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route
              path="business_register"
              element={<BusinessRegister />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
