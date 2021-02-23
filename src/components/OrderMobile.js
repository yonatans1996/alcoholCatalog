import React from 'react'
import "./OrderMobile.css"
function OrderMobile() {
    return (
        <div className="order-mobile-container">
            <div className="order-mobile">
                <h2>להזמנה מהירה:</h2>
                <div className="order-mobile-buttons">
                    <div className="order-mobile-phone">
                        <a href="tel:046451777">
                            <img src="https://impact-il.com/wp-content/uploads/2021/02/mobilebuttons_05.png" alt="phone"/>
                        </a>
                    </div>
                    <div className="order-mobile-whatsapp">
                        <a href="http://bit.ly/2NuKpLx">
                            <img src="https://impact-il.com/wp-content/uploads/2021/02/mobilebuttons_03.png" alt="phone"/>
                        </a>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default OrderMobile
