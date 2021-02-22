import React,{useState} from 'react'
import firebase from "./firebase"
function Form() {
    const [title,setTitle]=useState('');
    const [image,setImage]=useState('');
    const [price,setPrice]=useState('');
    const [ml,setMl]=useState('');
    const [mlPrice,setMlPrice]=useState('');
    const [location,setLocation]=useState(true); // By default location is top
    const database=firebase.database().ref("products");
    function handleSubmit(e){
        e.preventDefault();
        const position=location?"top":"bottom";
        const data={
            title:title,
            image:image,
            ml:ml,
            mlPrice:mlPrice,
            price:price,
            location:position
        }
        database.push(data);
        setTitle('');
        setImage('');
        setPrice('');
        setMl('');
        setMlPrice('');
        setLocation(true);
        
    }
   
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>הוסף מוצר</h1>
            <label>
                <h6 className="label_name">קישור לתמונה: </h6>
                <input value={image} onChange={e=>setImage(e.target.value)} type="text" required /> 
            </label>
            <label>
               <h6 className="label_name">כותרת למוצר: </h6>
                <input value={title} onChange={e=>setTitle(e.target.value)} type="text" required /> 
            </label>
            <label>
                <h6 className="label_name">כמות מ"ל: </h6>
                <input value={ml} onChange={e=>setMl(e.target.value)} type="text" required /> 
            </label>
            <label>
                <h6 className="label_name">מחיר למ"ל: </h6>
                <input value={mlPrice} onChange={e=>setMlPrice(e.target.value)} type="text" required /> 
            </label>
            <label>
                <h6 className="label_name">מחיר המוצר: </h6>
                <input value={price} onChange={e=>setPrice(e.target.value)} type="text" required /> 
            </label>
            <h6 className="label_name" style={{textAlign:"center"}}>מיקום המוצר: (במידה ולא נבחר המוצר יהיה למעלה)</h6>
            <label><input  onChange={e=>setLocation(true)} type="radio" value="למעלה" name="top"/>למעלה</label>
            <label><input  onChange={e=>setLocation(false)} type="radio" value="למעלה" name="top"/>למטה</label>
            <button type="submit">הוסף מוצר</button>
            
        </form>
    )
}

export default Form
