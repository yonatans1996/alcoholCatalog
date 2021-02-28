import React,{useState,useEffect} from 'react'
import "./Special.css";
import Carousel from 'react-bootstrap/Carousel'
import {useAuth} from "./Auth/AuthContext"
import {Button} from "react-bootstrap"
import {OverlayTrigger,Popover} from "react-bootstrap"
import {storage} from "./firebase"
function Special() {
    const {currentUser}=useAuth();
    const [pcLink,setPcLink]=useState('');
    const [mobileLink2,setMobileLink2]=useState('');
    const [mobileLink1,setMobileLink1]=useState('');
    const [filePc, setFilePc] = useState(null);
    const [fileMobile1, setFileMobile1] = useState(null);
    const [fileMobile2, setFileMobile2] = useState(null);
    const closePop=React.createRef();
    const disable=React.createRef();
    const f1=React.createRef();
    const f2=React.createRef();
    const popover1 = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">שינוי תמונה במחשב</Popover.Title>
          <Popover.Content>
            <input type="file" onChange={handlePcChange} />
            <Button onClick={handlePcinput} className="mt-1" variant="dark">העלאת תמונה</Button>
          </Popover.Content>
        </Popover>
      );
      function checkFiles(){
        if(!disable.current)
          return;
        if(fileMobile1 && fileMobile2)
        {
          disable.current.disabled=false;
        }
        else
        disable.current.disabled=true;
      }

      const popover2 = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">שינוי תמונות במובייל</Popover.Title>
          <Popover.Content>
            <input ref={f1} type="file" onChange={handleMobileChange1} />
            <input ref={f2} type="file" onChange={handleMobileChange2} />
            <Button ref={disable} disabled={true} onClick={handleMobileinput} className="mt-1" variant="dark">העלאת תמונות</Button>
          </Popover.Content>
        </Popover>
      );

      function handlePcChange(e){
        setFilePc(e.target.files[0]);
      }
      function handlePcinput(){
        if(!filePc)
        return;
          const uploadTask = storage.ref("specialImage").put(filePc);
          closePop.current.click();
          uploadTask.on("state_changed", console.log, console.error, () => {
            storage
              .ref("specialImage")
              .getDownloadURL()
              .then((url) => {
                setFilePc(null);
                setPcLink(url);
              });
          });
      }

      function handleMobileChange1(e){
        setFileMobile1(e.target.files[0]);
        checkFiles();
      }
      function handleMobileinput(){
        if(!fileMobile1)
          return;
          const uploadTask = storage.ref("specialImageMobile1").put(fileMobile1);
          uploadTask.on("state_changed", console.log, console.error, () => {
            storage
              .ref("specialImageMobile1")
              .getDownloadURL()
              .then((url) => {
                setFileMobile1(null);
                setMobileLink1(url);
              });
          });
          handleMobileinput2();
      }
      function handleMobileChange2(e){
        setFileMobile2(e.target.files[0]);
        checkFiles();
      }
      useEffect(()=>{
        //eslint-disable-next-line
        checkFiles();
      },[fileMobile1,fileMobile2])
      function handleMobileinput2(){
        if(!fileMobile2)
          return;
          const uploadTask = storage.ref("specialImageMobile2").put(fileMobile2);
          closePop.current.click();
          uploadTask.on("state_changed", console.log, console.error, () => {
            storage
              .ref("specialImageMobile2")
              .getDownloadURL()
              .then((url) => {
                setFileMobile2(null);
                setMobileLink2(url);
              });
          });
      }


      useEffect(()=>{
        storage.ref("specialImage").getDownloadURL().then(res=>setPcLink(res));
        storage.ref("specialImageMobile1").getDownloadURL().then(res=>setMobileLink1(res));
        storage.ref("specialImageMobile2").getDownloadURL().then(res=>setMobileLink2(res));

      },[])

    return (
    <div className="special-container" ref={closePop}>
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
