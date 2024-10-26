import React from "react";

import { useNavigate } from "react-router-dom";
const AddProduct=()=>{
    const [P_name,setP_Name]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const navigate=useNavigate();
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    const [error,setError]=React.useState(false);
    //console.warn(userId);

    const addproduct=async()=>{

        if(!P_name || !price||!category|| !company)
        {
            setError(true);
            return false;
        }
        console.warn(P_name,price,category,company,userId);
        let result=await fetch('http://localhost:3001/add-product',{
         method:'post',
        //  headers:{
        //     authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        // },
         body:JSON.stringify({P_name,price,category,userId,company}),
         headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         },
        });
  
        result=await result.json();
        console.warn(result);
        localStorage.setItem("product",JSON.stringify(result));
        if(result)
        {
            alert("Added product");
        }
    }


    return (
        <div className="product">
            <h1>
                Add Product
            </h1>
            <input type="text" value={P_name} onChange={(e)=>setP_Name(e.target.value)}  placeholder="Enter product name" className="product_class"/>
            {  error&& !P_name&&<span className="invalid-text">Enter valid Name </span>}
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter product price" className="product_class"/>
            {  error&& !price&&<span className="invalid-text">Enter valid price </span>}
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter product category" className="product_class"/>
            {  error&& !category&&<span className="invalid-text">Enter validcategory </span>}
            <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Enter product company" className="product_class"/>
            {  error&& !company&&<span className="invalid-text">Enter valid company </span>}
            <button className="btn" onClick={addproduct}>Add Product </button>



        </div>
    )
}
export default AddProduct;