import React from 'react'
import "./FooterPc.css"
function FooterPc() {
    return (
        <div className="footer-pc">
            <div className="footer">
                <h2>סניפים:</h2>
                <p id="footer-pc">
                    רחוב הגלעד 1, מתחם תבורי, פרדס חנה | רחוב צה”ל 35 , מתחם מיקס, חדרה
                </p>
                <p id="footer-mobile">
                רחוב הגלעד 1, מתחם תבורי, פרדס חנה<br/>רחוב צה”ל 35 , מתחם מיקס, חדרה
                </p>
                
            </div>
            <div className="footer-img">
                <img src="https://impact-il.com/wp-content/uploads/2021/02/logo_26.png" alt="עולם היין"/>
            </div>
            
        </div>
    )
}

export default FooterPc
