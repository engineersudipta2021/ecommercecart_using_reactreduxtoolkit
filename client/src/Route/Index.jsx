import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Products from '../Components/Products'
import CardsDetails from '../Components/CardsDetails'
import Navigations from '../Layout.jsx/Navigations'
import Success from '../Components/Success'
import Cancel from '../Components/Cancel'

function Index() {
  return (
    <div>
       <BrowserRouter>
      <Navigations/>
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/cards" element={<CardsDetails/>} />
        <Route  path='/success' element={<Success />}/>
        <Route  path='/cancel' element={<Cancel />}/>
      </Routes>
      
      </BrowserRouter>

    </div>
  )
}

export default Index
