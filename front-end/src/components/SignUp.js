import React from "react";
import { useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";

const SignUp=()=>{
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
    const collectData=async()=>{
        console.warn(name,email);
        let result=await fetch('http://localhost:3001/register',{
         method:'post',
         body:JSON.stringify({name,email,password}),
         headers:{
            'Content-Type':'application/json'
         },
        });
  
        result=await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result)
        {
            navigate('/')
        }
    }


    return (
        <div className="sign"> 
            <h1 className="signup">Register</h1>
                <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" className="name" />
                <input type="text"   value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder="Enter Email" className="email"/>
                <input type="password"  value={password} onChange={(e)=>setPasword(e.target.value)}    placeholder="Enter password" className="password"/>
                 <button  onClick={collectData} type="button" className="btn">Sign Up</button>

            
        </div>
    )

}
export default SignUp;