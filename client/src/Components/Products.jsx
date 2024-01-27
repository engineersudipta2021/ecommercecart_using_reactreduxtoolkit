import React, { useState } from 'react'
import Data from '../Redux/Data/Data';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Feature/CardSlice';

function Products() {
 const[data,setData] = useState(Data);
 const dispatch = useDispatch();
const addToCard = (Product) =>{
  dispatch(addToCart(Product))
}




const cards =  data.map((Product)=>{
  return(<div className='col-md-3' key={Product.id} style={{marginBottom:"10px ",marginTop:"10px"}}>
  <Card key={Product.id} style={{height:"100%" }}>
      <div className='text-center'>
  <Card.Img variant="top" src={Product.imgdata} style={{height:"230px",width:"300px"}}/>
  </div>
  <Card.Body>
    <Card.Title>{Product.dish}</Card.Title>
    <Card.Text>
     INR :{Product.price}
    </Card.Text>
  
  </Card.Body>
  <Card.Footer style={{backgroundColor:"white"}}>
  <Button variant="primary" onClick={()=>addToCard(Product)} >Add To Cut</Button>
  
  </Card.Footer>
</Card>
</div>
  )
})
  return (
    <div className='row' style={{margin:"15px"}}>

     {cards}
    </div>
  )
}

export default Products
