import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {loadStripe} from '@stripe/stripe-js';

import { addToCart,removeToCart ,removeSingleIteams,emptycartIteam} from '../Redux/Feature/CardSlice';
 import "./Cardstyle.css"

function CardsDetails() {
 const FoodCards = useSelector(State => State.allCart)
//  console.log("output",state);
const dispatch = useDispatch();

//  const RemoveToCard = (id) =>{
//    console.log("re",dispatch(removeToCart(id)));
//    dispatch(removeToCart(id));
//  } 



 const [totalprice,setPrice] = useState(0);
 const [totalquantity,setTotalQuantity] = useState(0);

     // add to cart
     const handleIncrement = (e)=>{
      dispatch(addToCart(e))
  }

  // remove to cart
  const handleDecrement = (e)=>{
      dispatch(removeToCart(e));
      toast.success("Item Remove From Your Cart")
  }

  // remove single item 
  const handleSingleDecrement = (e)=>{
      dispatch(removeSingleIteams(e))
  }

  // empty cart
  const emptycart = ()=>{
      dispatch(emptycartIteam())
      toast.success("Your Cart is Empty")

  }

  // count total price
  const total = ()=>{
      let totalprice = 0
      FoodCards.map((ele,ind)=>{
          totalprice = ele.price * ele.qnty + totalprice
      });
      setPrice(totalprice)
  }  

  
  // count total quantity
  const countquantity = ()=>{
      let totalquantity = 0
      FoodCards.map((ele,ind)=>{
          totalquantity = ele.qnty + totalquantity
      });
      setTotalQuantity(totalquantity)
  }  
  
  useEffect(()=>{
      total()
  },[total])

  useEffect(()=>{
      countquantity()
  },[countquantity])



//  const CartCards =  FoodCards.map((Product)=>{
//   return(<div className='col-md-12' key={Product.id} style={{marginBottom:"10px ",marginTop:"10px"}}>
//   <Card key={Product.id} style={{height:"100%" }}>
//       <div className='text-center'>
//   <Card.Img variant="top" src={Product.imgdata} style={{height:"230px",width:"300px"}}/>
//   </div>
//   <Card.Body className='text-center'>
//     <Card.Title>{Product.dish}</Card.Title>
//     <Card.Text>
//      INR :{Product.price}
//     </Card.Text>
  
//   </Card.Body>
//   <Card.Footer className='text-center' style={{backgroundColor:"white"}}>
//   <Button variant="danger" onClick={()=>RemoveToCard(Product.id)} >Remove To Card </Button>
  
//   </Card.Footer>
// </Card>
// </div>
//   )
// }) 

// const total =FoodCards.reduce((a,b)=>a+b.price,0);
// console.log("total",total);
// const Array = [0,1]

//payment Integrations part
const makePayment =async()=>{
    const stripe = await loadStripe("pk_test_51OZdWTSHICmC3fewiAeSyP2JBUkX5XR4dHBkap02cgXRnhNJs8fNoWCYopJE0HjbiKpAgrgFrO69M1ecsE2JR21700bfIGk6lD");

     const body = {
        products:FoodCards
     }
     const headers = {
        "Content-Type" : "application/json"

     }
     const response = await fetch("http://localhost:7000/api/create-checkout-session",{
        method :"POST",
        headers :headers,
        body:JSON.stringify(body)
     });
     const session = await response.json();
     const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    if(result.error){
        console.log(result.error);
    }
}

  return (
    <div  >
{/* {CartCards} */}
{/* <h1 style={{paddingLeft:"450px"}}>Total Bill: Rs:{total}/-</h1> */}

<div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex'>
                                <h5 className='text-white m-0'>Cart Calculation{FoodCards.length >0 ? `(${FoodCards.length})`:""}</h5>
                                {
                                    FoodCards.length > 0 ? <button className='btn btn-danger mt-0 btn-sm'
                                    onClick={emptycart}
                                    ><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                                        : ""
                                }
                            </div>

                        </div>
                      <div className="card-body p-0">
                                {
                                    FoodCards.length === 0 ? <table className='table cart-table mb-0'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={6}>
                                                    <div className='cart-empty'>
                                                        <i className='fa fa-shopping-cart'></i>
                                                        <p>Your Cart Is Empty</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                                            </tr>
                                        </thead>
                                         <tbody>
                                            {
                                                FoodCards.map((data,index)=>{
                                                  // console.log("data",data);
                                                    return (
                                                        <>
                                                            <tr key={index}>
                                                                <td>
                                                                    <button className='prdct-delete'
                                                                    onClick={()=>handleDecrement(data.id)}
                                                                    ><i className='fa fa-trash-alt'></i></button>
                                                                </td>
                                                                <td><div className='product-img'><img src={data.imgdata} alt="" /></div></td>
                                                                <td><div className='product-name'><p>{data.dish}</p></div></td>
                                                                <td>{data.price}</td>
                                                                 <td>
                                                                    <div className="prdct-qty-container">
                                                                        <button className='prdct-qty-btn' type='button' 
                                                                        onClick={data.qnty <=1 ?()=>handleDecrement(data.id) :()=>handleSingleDecrement(data)}
                                                                        >
                                                                            <i className='fa fa-minus'></i>
                                                                        </button>
                                                                        <input type="text" className='qty-input-box' value={data.qnty} disabled name="" id="" />
                                                                        <button className='prdct-qty-btn' type='button' onClick={()=>handleIncrement(data)}>
                                                                            <i className='fa fa-plus'></i>
                                                                        </button>
                                                                    </div>
                                                                </td> 
                                                                <td className='text-right'>₹ {data.qnty * data.price}</td> 
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody> 
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={2}>&nbsp;</th>
                                                <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalquantity}</span></th>
                                                <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹ {totalprice}</span></th>
                                                <th className='text-right'><button className='btn btn-success' onClick={makePayment} type='button'>Checkout</button></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                } 
                         </div>
                    </div>
                </div>
            </div> 

    </div>
  )
}

export default CardsDetails
