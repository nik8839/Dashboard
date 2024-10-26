import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowProduct=()=>{
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProducts();

    },[])
    const getProducts=async()=>{
        let result=await fetch("http://localhost:3001/showproducts",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
       
        );
        result=await result.json();
        setProducts(result);
       console.warn(result);
    }
    
    const deleteProduct = async (id) => {
        console.warn(id);
        try {
            let result = await fetch(`http://localhost:3001/product/${id}`, {
                method: 'DELETE',
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
    
            result = await result.json();
            if (result) {
                getProducts();
            } else {
                alert("Can't delete");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
        }
    };
    const searchHandle=async(event)=>{
        console.warn(event.target.value)
        let key=event.target.value;
        if(key)
        {
            let result=await fetch(`http://localhost:3001/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result=await result.json();
            if(result)
          {
            setProducts(result);
    
          }
        }
     
      else
      {
        getProducts();
      }
      

    }
    return (
        <div className="product-list">
            <h1>
                Welcome to show list 
            </h1>
            <input type="text" placeholder="Search here" className="search" onChange={searchHandle}></input>

            <ul>
                <li>S.No </li>
                <li>Name </li>
                <li>Price </li>
                <li>Category </li>
                <li>Operations</li>

            </ul>
            {
                products.length>0?
                products.map((item,index)=>
                <ul key={item._id}>
                <li>{index+1} </li>
                <li>{item.P_name} </li>
                <li>${item.price} </li>
                <li>{item.category} </li>
                <li> <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id} className="Update"> Update</Link>
                
                </li>
                   

                </ul>
                )
                :
                <h1>No result found</h1>

            }
           
        </div>

    )

}
export default  ShowProduct;