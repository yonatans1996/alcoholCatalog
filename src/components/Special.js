import React from 'react'
import "./Special.css";
import Carousel from 'react-bootstrap/Carousel'

function Special() {
    return (
    <div className="special-container">
        <div class="special">
            <h1>SPECIAL SALE</h1>
        </div>
            <img id="special_image_pc" src="https://impact-il.com/wp-content/uploads/2021/02/2-%D7%91%D7%90%D7%A0%D7%A8%D7%99%D7%9D-copy-1.jpg" alt="עולם היין" />
            <Carousel id="special_image_mobile" slide={true}>
                <Carousel.Item interval={3000}>
                    <img className="d-block w-100" src="https://impact-il.com/wp-content/uploads/2021/02/באנר-וודקה.jpg" alt="First slide"/>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img className="d-block w-100" src="https://impact-il.com/wp-content/uploads/2021/02/באנר-יין-copy.jpg" alt="Second slide"/>
                </Carousel.Item>
            </Carousel>
    
            
     </div>
        
    )
}

export default Special
