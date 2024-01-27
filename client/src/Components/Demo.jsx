import React, { useEffect, useRef, useState } from 'react'

function Demo() {
   const[inputValue,setInputValue] = useState(0);

  const count = useRef(0);
console.log(count.current)
//    useEffect(()=>{
//     setCount(count+1);
//    },[]);
useEffect(()=>{
count.current = count.current+1;
});
  return (
    <div  style={{paddingLeft:"150px"}} >

          <input type="text" placeholder='Name' style={{padding:"5px"}} onChange={()=>{setInputValue(e.target.value)}} />
          <br />
        <h1>count :{count}</h1>
        <p>value : </p>
        
    </div>
  )
}

export default Demo
