import React,{useState,useEffect} from 'react'
import Product from "./Product";
import firebase from "./firebase"
/* eslint-disable react-hooks/exhaustive-deps */
function Products({location}) {
    const [list,setList]=useState([]);
    useEffect(() => {
        const database=firebase.database().ref("products");
        database.on('value',(snapshot)=>{
            console.log(snapshot.val());
            const data=snapshot.val();
            const products=[];
            console.log("Data is "+snapshot);
            for(let id in data)
            {
                location && data[id].location==="top" && products.push(data[id]);
                !location && data[id].location==="bottom" && products.push(data[id]);
            }
            
            setList(products);
            
        })
       
    }, []);
    return (
        <div className="products">
            {list.map(product=>{
                    return( <Product image={product.image} title={product.title} price={product.price} ml={product.ml} mlPrice={product.mlPrice} />)
            })}
        </div>
    )
}

export default Products
