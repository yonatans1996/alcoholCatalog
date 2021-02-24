import React from 'react'
import {useAuth} from "./Auth/AuthContext"
import {Button} from "react-bootstrap"

function Product({image,title,price,ml,mlPrice,handleDelete,id}) {
    const {currentUser}=useAuth();
   
    return (
        <div className="product">
            <img className="product_image" src={image} alt={title}/>
            <h3 style={{fontSize:"26px"}}>{title}</h3>
            <h5 style={{fontSize:"20px",fontWeight:"500"}}>{ml} מ"ל</h5>
            <h6 style={{fontSize:"18px",fontWeight:"400"}}>מחיר ל - 100 מ״ל:  {mlPrice}</h6>
            <div>
            <img className="product_line" style={{height:"auto"}} src="https://impact-il.com/wp-content/uploads/2021/02/line_18.jpg" alt={title}/>
            <h4 style={{fontSize:"26px",color:"#81051F",direction:"rtl"}}>{price} ₪ </h4>
            {currentUser && (<Button variant="danger" onClick={()=>handleDelete(id)}>מחק</Button>)}
            </div>
        </div>
    )
}

export default Product
