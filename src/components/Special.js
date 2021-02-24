import React,{useState,useEffect} from 'react'
import "./Special.css";
import Carousel from 'react-bootstrap/Carousel'
import {useAuth} from "./Auth/AuthContext"
import {Button} from "react-bootstrap"
import {OverlayTrigger,Popover} from "react-bootstrap"
import firebase from "./firebase"
function Special() {
    const {currentUser}=useAuth();
    const [pcUrl,setPcUrl]=useState('');
    const [mobileUrl1,setMobileUrl1]=useState('');
    const [mobileUrl2,setMobileUrl2]=useState('');
    const [pcLink,setPcLink]=useState('');
    const [mobileLink2,setMobileLink2]=useState('');
    const [mobileLink1,setMobileLink1]=useState('');

    const popover1 = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">הכנס כתובת תמונה</Popover.Title>
          <Popover.Content>
            <input type="text" onKeyPress={handlePcinput} value={pcUrl} onChange={handlePcinput} />
          </Popover.Content>
        </Popover>
      );
      const popover2 = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">הכנס כתובת תמונה</Popover.Title>
          <Popover.Content>
            <input type="text" onKeyPress={handleMobileinput1} value={mobileUrl1} onChange={handleMobileinput1} />
            <input type="text" onKeyPress={handleMobileinput2} value={mobileUrl2} onChange={handleMobileinput2} />
          </Popover.Content>
        </Popover>
      );

      async function handlePcinput(e){
        setPcUrl(e.target.value);
        if(e.key==="Enter")
        {
            const database=await firebase.database().ref("SpecialPc");
            database.set(pcUrl);
            setPcUrl('');
            database.on('value',(snapshot)=>{
            const data=snapshot.val();
            if(data){
             setPcLink(data);
            }
            }
            );
        }

      }
      async function handleMobileinput1(e){
        setMobileUrl1(e.target.value);
        if(e.key==="Enter")
        {
            const database=await firebase.database().ref("SpecialMobile1");
            database.set(mobileUrl1);
            setMobileUrl1('');
            database.on('value',(snapshot)=>{
            const data=snapshot.val();
            if(data){
             setMobileLink1(data);
            }
            }
            );
        }

      }
      async function handleMobileinput2(e){
        setMobileUrl2(e.target.value);
        if(e.key==="Enter")
        {
            const database=await firebase.database().ref("SpecialMobile2");
            database.set(mobileUrl2);
            setMobileUrl2('');
            database.on('value',(snapshot)=>{
            const data=snapshot.val();
            if(data){
             setMobileLink2(data);
            }
            }
            );
        }

      }
      useEffect(()=>{
        const dbMobile1=firebase.database().ref("SpecialMobile1");
        const dbMobile2=firebase.database().ref("SpecialMobile2");
        const dbPc=firebase.database().ref("SpecialPc");
        dbMobile1.on('value',(snapshot)=>{
          const data=snapshot.val();
           setMobileLink1(data);  
          });
        dbMobile2.on('value',(snapshot)=>{
        const data=snapshot.val();
            setMobileLink2(data);  
        });
          dbPc.on('value',(snapshot)=>{
            const data=snapshot.val();
             setPcLink(data);   
            });
      },[])

    return (
    <div className="special-container">
        <div className="special">
            <h1>SPECIAL SALE</h1>
        </div>
            <img id="special_image_pc" src={pcLink} alt="עולם היין" />
            <Carousel id="special_image_mobile" slide={true} touch={true} wrap={true}>
                <Carousel.Item interval={3000} slide={true} touch={true} wrap={true}>
                    <img className="d-block w-100" src={mobileLink1} alt="First slide"/>
                </Carousel.Item>
                <Carousel.Item interval={3000} slide={true} touch={true} wrap={true}>
                    <img className="d-block w-100" src={mobileLink2} alt="Second slide"/>
                </Carousel.Item>
            </Carousel>
    
            {currentUser?(<div className="special-admin">
            <OverlayTrigger trigger="click" placement="right" overlay={popover1} rootClose={true}>
                <Button className="special-admin-button-pc" variant="info">החלף תמונה במחשב </Button>
                </OverlayTrigger>
                <OverlayTrigger trigger="click" placement="right" overlay={popover2} rootClose={true}>
                <Button className="special-admin-button-mobile" variant="info">החלף תמונה במובייל </Button>
                </OverlayTrigger>
            
             </div>
            ):false}
     </div>
        
    )
}

export default Special
