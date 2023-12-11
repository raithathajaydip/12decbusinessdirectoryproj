import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from './Pages/Detail'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Layout from './component/ui/Layout'

export default function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Layout/>}>
                <Route index element={<Home/>}></Route>
                <Route path='detail' element={<Detail/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='register' element={<Register/>}></Route>
                </Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
            
        </BrowserRouter>
    </div>
  )
}
