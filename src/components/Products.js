import React,{useState,useEffect} from 'react'
import Product from "./Product";
import firebase,{storage} from "./firebase"


/* eslint-disable react-hooks/exhaustive-deps */
function Products({location}) {
    const [list,setList]=useState([]);

    useEffect(() => {
        const database=firebase.database().ref("products");
        database.on('value',(snapshot)=>{
            const data=snapshot.val();
            const products=[];
            for(let id in data)
            {
                if(location && data[id].location==="top")
                { 
                    products.push({...data[id],id:id});
                }
                else if(!location && data[id].location==="bottom"){
                    products.push({...data[id],id:id});
                }
            }
            
            setList(products);
            
        })
     
       
    }, []);
    function handleDelete(id,image){
        const imageRef=storage.refFromURL(image).delete();
        imageRef.delete();
        const database=firebase.database().ref("products/"+id);
        database.remove();

    }
    return (
        <div className="products">
            {list.filter((p)=>p.title!=null).map(product=>{
                    return( <Product handleDelete={handleDelete} image={product.image} id={product.id} key={product.id} title={product.title} price={product.price} ml={product.ml} />)
            })}
        </div>
    )
}

export default Products
