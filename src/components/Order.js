import React from 'react'
import "./Order.css";
function Order() {
    return (
        <div className="order-container">
            <h2>להזמנה מהירה</h2>
            <div className="order-buttons">
                <div className="order-phone">
                    <a href="tel:046451777">
                        <img src="https://impact-il.com/wp-content/uploads/2021/02/buttons_21.jpg" alt="orderPhone"/>
                    </a>
                </div>
                <div className="order-whatsapp">
                  <a href="http://bit.ly/2NuKpLx">  
                    <img src="https://impact-il.com/wp-content/uploads/2021/02/buttons_19.jpg" alt="orderWhatsapp"/>
                  </a>
                </div>          
            </div>
        </div>
    )
}

export default Order
