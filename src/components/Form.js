import React,{useState} from 'react'
import firebase from "./firebase"
import {storage} from "./firebase"
import {Button} from "react-bootstrap"

function Form() {
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const [ml,setMl]=useState('');
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    const [location,setLocation]=useState(true); // By default location is top
    const database=firebase.database().ref("products");
    function handleSubmit(e){
        e.preventDefault();
        handleUpload();
    }
    
    async function handleChange(e) {
        setFile(e.target.files[0]);
      }
    function handleUpload() {
        var currentdate = new Date();
        var datetime = currentdate.getDay() + ":" + currentdate.getMonth() 
        + ":" + currentdate.getFullYear() + ":" 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        const uploadTask = storage.ref("/images/"+datetime+"/"+file.name).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("images/"+datetime+"/")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setFile(null);
              setURL(url);
              const position=location?"top":"bottom";
              const data={
                  title:title,
                  image:url,
                  ml:ml,
                  price:price,
                  location:position
              }
              database.push(data);
              setTitle('');
              setPrice('');
              setMl('');
              setLocation(true);
              document.getElementById('top').checked=false;
              document.getElementById('bottom').checked = false;
            });
        });
       
      }
   
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>הוסף מוצר</h1>
            <label>
               <h6 className="label_name">כותרת למוצר: </h6>
                <input value={title} onChange={e=>setTitle(e.target.value)} type="text" required /> 
            </label>
            <label>
                <h6 className="label_name">כמות מ"ל: </h6>
                <input value={ml} onChange={e=>setMl(e.target.value)} type="text" required /> 
            </label>
            <label>
                <h6 className="label_name">מחיר המוצר: </h6>
                <input value={price} onChange={e=>setPrice(e.target.value)} type="text" required /> 
            </label>
            <label>
                <h6 className="label_name">העלה תמונה של המוצר: </h6>
                <input onChange={handleChange} type="file" required />
                <img style={{width:"100px"}}src={url} alt="" />
            </label>
            <h6 className="label_name" style={{textAlign:"center"}}>מיקום המוצר: (במידה ולא נבחר המוצר יהיה למעלה)</h6>
            <label><input id="top"  onChange={e=>setLocation(true)} type="radio" value="למעלה" name="top"/>למעלה</label>
            <label><input id="bottom" onChange={e=>setLocation(false)} type="radio" value="למטה" name="top"/>למטה</label>
            <Button variant="primary" type="submit">הוסף מוצר</Button>
            
        </form>
    )
}

export default Form
