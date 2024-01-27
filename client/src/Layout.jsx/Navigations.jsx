import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navigations() {

const IncreaseProductLengths = useSelector(state => state.allCart)
console.log("I ",IncreaseProductLengths);

    const Navigationbar =  <Navbar collapseOnSelect expand="lg" bg="black" data-bs-theme="dark" >
    <Container>
      <Navbar.Brand href="#home">E-commerce Card using React-Redux </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-Scroll" />
      <Navbar.Collapse id="navbar-Scroll">
        <Nav className="me-auto">
          <Nav.Link to="/" as={Link}>Home</Nav.Link>
          <Nav.Link to="/Products" as ={Link}>Products</Nav.Link>
         
          
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
      <Nav.Link to="/cards" as ={Link} >My Bag{IncreaseProductLengths.length}  </Nav.Link>
      </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  return (
    <div>
      {Navigationbar}
    </div>
  )
}

export default Navigations
