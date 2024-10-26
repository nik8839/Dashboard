import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const[name,setName]=useState("");
    const[password,setPasword]=useState("");
    const[email,setEmail]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth)
        {
        navigate('/');
        }
    },[])
    const handleLogin=async()=>{
        
        console.warn({name,email,password});
        let result= await fetch('http://localhost:3001/login',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
               'Content-Type':'application/json'
            },
           })
           result=await result.json();
           console.warn(result);
         //  if(result.name)
         if(result.auth)
           {
              localStorage.setItem("user",JSON.stringify(result.user));
              localStorage.setItem("token",JSON.stringify(result.auth));
              navigate('/');
           }
           else{
            alert("PLEASE enter valid credentials");
           }


    }


    return (
        
        <div className="login">
              <h1><center>
                Login
                </center> </h1>
                <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" className="name" />
                <input type="text"   value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder="Enter Email" className="email"/>
                <input type="password"  value={password} onChange={(e)=>setPasword(e.target.value)}   placeholder="Enter password" className="password"/>
           <button type="button"   onClick={handleLogin} className="btn">Sign Up</button>
        </div>

    ) 
}
export default Login;
