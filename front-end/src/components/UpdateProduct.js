import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const UpdateProduct=()=>{
    const [P_name,setP_Name]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const navigate=useNavigate();
    // const userId=JSON.parse(localStorage.getItem('user'))._id;
    //const [error,setError]=React.useState(false);
    //console.warn(userId);
    const params=useParams();
    useEffect(()=>{
        console.warn(params);
        getProductDetails();

    },[])
    const getProductDetails=async()=>{
        let result=await fetch(`http://localhost:3001/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setP_Name(result.P_name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateproduct=async()=>{
        console.log({P_name,price,category,company});
        let result=await fetch(`http://localhost:3001/product/${params.id}`,{
            method:"Put",
            // headers:{
            //     authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body:JSON.stringify(
                {P_name,price,category,company}),
                headers:{
                    "Content-Type":"application/json",
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

                    
                    

                }
            

        });
        result=await result.json()
        console.log(result)
        navigate('/')
        } 

        

       
        
  
        


    return (
        <div className="product">
            <h1>
                Update Product
            </h1>
            <input type="text" value={P_name} onChange={(e)=>setP_Name(e.target.value)}  placeholder="Enter product name" className="product_class"/>
            
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter product price" className="product_class"/>
            
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter product category" className="product_class"/>
            
            <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Enter product company" className="product_class"/>
            
            <button className="btn" onClick={updateproduct}>Update Product </button>



        </div>
    )
    }

export default UpdateProduct;