import React,{useState,useEffect} from 'react'
import {useAuth} from "./Auth/AuthContext"
import {Button,OverlayTrigger,Popover} from "react-bootstrap"
import "./Header.css"
import firebase from "./firebase";
function Header() {
    const {currentUser}=useAuth();
    const [pcUrl,setPcUrl]=useState('');
    const [mobileUrl,setMobileUrl]=useState('');
    const [pcLink,setPcLink]=useState('');
    const [mobileLink,setMobileLink]=useState('');

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
            <input type="text" onKeyPress={handleMobileinput} value={mobileUrl} onChange={handleMobileinput} />
          </Popover.Content>
        </Popover>
      );
      async function handlePcinput(e){
        setPcUrl(e.target.value);
        if(e.key==="Enter")
        {
            const database=await firebase.database().ref("headerImage");
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
      async function handleMobileinput(e){
        setMobileUrl(e.target.value);
        if(e.key==="Enter")
        {
            const database=await firebase.database().ref("headerImageMobile");
            database.set(mobileUrl);
            setMobileUrl('');
            database.on('value',(snapshot)=>{
            const data=snapshot.val();
            if(data){
             setMobileLink(data);
            }
            }
            );
        }

      }
      useEffect(()=>{
        const dbMobile=firebase.database().ref("headerImageMobile");
        const dbPc=firebase.database().ref("headerImage");
        dbMobile.on('value',(snapshot)=>{
          const data=snapshot.val();
           setMobileLink(data);
          
          });
          dbPc.on('value',(snapshot)=>{
            const data=snapshot.val();
             setPcLink(data);
            
            });


      },[])
    

      

    return (
        <header className="header">
            <img className="pc" src={pcLink} alt="עולם היין"/>
            <img className="mobile" src={mobileLink} alt="עולם היין"/>
            {currentUser && (<div className="admin-header-buttons">
                <OverlayTrigger trigger="click" placement="right" overlay={popover1} rootClose={true}>
                    <Button className="ml-5" variant="info">החלף תמונה במחשב</Button>
                </OverlayTrigger>
                <OverlayTrigger trigger="click" placement="left" overlay={popover2}  rootClose={true}>
                    <Button variant="info">החלף תמונה במובייל</Button>
                </OverlayTrigger>
                
               
            </div>)}
          
         </header>
    )
}

export default Header
