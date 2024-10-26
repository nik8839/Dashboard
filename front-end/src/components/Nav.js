import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
const Nav=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
        console.warn("we are clearing local storage of yours")
        localStorage.clear();
        navigate('/signup');

    }
   
    return (

        <div>
            <img 
            alt='logo'
            className='logo'
            src='https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg'/>
         {  
         
         auth?  <ul className='nav-ul'>
        <li>
        <Link to="/product">Products</Link>
        </li>
        <li>
        <Link to="/add ">Add Product</Link>
        </li>
        <li>
        <Link to="/update ">Update Product</Link>
        </li>
        <li>
        <Link to="/profile ">Profile</Link>
        </li>
        <li>
                <Link onClick={logout} to="/signup ">Logout, {JSON.parse(auth).name}</Link>
                </li>

        </ul>
        :
        <ul className='nav-ul nav-right'>
        <li>
        <Link to="/login">Login</Link>
        </li>
        <li>
        <Link to="/signup ">Register</Link>
        </li>
        </ul>
         }
         
        </div>

    )
}
export default Nav;