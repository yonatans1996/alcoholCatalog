import React,{useState,useEffect} from 'react'
import {useAuth} from "./Auth/AuthContext"
import {Button,OverlayTrigger,Popover} from "react-bootstrap"
import "./Header.css"
import {storage} from "./firebase";
function Header() {
    const {currentUser}=useAuth();
    const [pcLink,setPcLink]=useState('');
    const [mobileLink,setMobileLink]=useState('');
    const [filePc, setFilePc] = useState(null);
    const [fileMobile, setFileMobile] = useState(null);
    const closePop=React.createRef();

    const popover1 = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">שינוי תמונת הדר</Popover.Title>
          <Popover.Content>
            <input type="file" onChange={handlePcChange} />
            <Button onClick={handlePcinput} className="mt-1" variant="dark">העלאת תמונה</Button>
          </Popover.Content>
        </Popover>
      );

      const popover2 = (
        <Popover id="popover-basic">
          <Popover.Title as="h3"> שינוי תמונת הדר במובייל</Popover.Title>
          <Popover.Content>
            <input type="file" onChange={handleMobileChange} />
            <Button onClick={handleMobileinput} className="mt-1" variant="dark">העלאת תמונה</Button>
          </Popover.Content>
        </Popover>
      );

      function handlePcChange(e){
        setFilePc(e.target.files[0]);
      }
      function handlePcinput(){
        if(!filePc)
        return;
          const uploadTask = storage.ref("headerImage").put(filePc);
          closePop.current.click();
          uploadTask.on("state_changed", console.log, console.error, () => {
            storage
              .ref("headerImage")
              .getDownloadURL()
              .then((url) => {
                setFilePc(null);
                setPcLink(url);
              });
          });
      }

      function handleMobileChange(e){
        setFileMobile(e.target.files[0]);
      }
      function handleMobileinput(){
        if(!fileMobile)
        return;
          const uploadTask = storage.ref("headerImageMobile").put(fileMobile);
          closePop.current.click();
          uploadTask.on("state_changed", console.log, console.error, () => {
            storage
              .ref("headerImageMobile")
              .getDownloadURL()
              .then((url) => {
                setFileMobile(null);
                setMobileLink(url);
              });
          });
      }

      useEffect(()=>{
        storage.ref("headerImage").getDownloadURL().then(res=>setPcLink(res));
        storage.ref("headerImageMobile").getDownloadURL().then(res=>setMobileLink(res));



      },[])
    

      

    return (
        <header className="header" ref={closePop}>
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
