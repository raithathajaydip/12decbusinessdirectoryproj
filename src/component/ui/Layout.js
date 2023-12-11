import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
        <>
    <Container className='a_tbdr'>
        <Header></Header>
                <main>
                    <Outlet/>
                </main>
        <Footer></Footer>
    </Container>
        </>
  )
}
