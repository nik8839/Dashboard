const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
require('./db/config');
const User=require("./db/User");
const Product = require('./db/Product');
//const Users = require('./db/Users');
const app=express();
const Jwt=require('jsonwebtoken');
const jwtKey='e-comm';
//const PORT = 3000;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.post("/register",async(req,resp)=>{
     let user= new User(req.body);
     let result=await user.save();
     result=result.toObject();
     delete result.password;
     Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err)
        resp.send({result:"Something went wrong"})
        resp.send({result,auth:token})
         
    })
    // resp.send(result);
    //resp.send("api in progress");
})
// for login api
app.post("/login",async (req,resp)=>{
    if(req.body.email && req.body.password)
    {
        let user=await User.findOne(req.body).select("-password");
    if(user)
    {
        Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err)
            resp.send({result:"Something went wrong"})
            resp.send({user,auth:token})
            
        })
      //  resp.send(user)
        
    }
    else
    resp.send({result:"No user found"})
    
}
    
else
resp.send({result:"No user found"});

    
//     else
// resp.send({result:"No user found"});
    

})

// product api
app.post("/add-product",verifyToken,async(req,resp)=>{
    let product= new Product(req.body);
    let result=await product.save();
   // result=result.toObject();
   // delete result.password;
    resp.send(result);
   //resp.send("api in progress");
})

// profile api
app.get("/profile",async(req,resp)=>{
   let result= localStorage.getItem('user');
    console.warn(result);
    resp.json({result: "profile api is working"});

})

//product list api
app.get("/showproducts",verifyToken,async(req,resp)=>{
    let products=await Product.find();
    if(products.length>0)
    {
        resp.send(products);
    }
    else{
        resp.send({result:"No result found"});
    }
})

app.delete("/product/:id",async(req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get("/product/:id",async(req,resp)=>{
let result=await  Product.findOne({_id:req.params.id});
if(result)
resp.send(result);
else
resp.send({result:"Resultnot found"})

})

//update
app.put("/product/:id",async(req,resp)=>{
    let result=await Product.updateOne(
        {
            _id:req.params.id
        },
        {
            $set:req.body

        }
            )
            resp.send(result);

})

app.get("/search/:key",verifyToken,async(req,resp)=>{
    let result=await Product.find({
        "$or":[
            {P_name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},


        ]
    }


    );
    if(result)
    resp.send(result);
else
resp.send({result:"No result"})

})


function verifyToken(req,resp,next){
     let token=req.headers['authorization'];
     //console.warn(token)
    if(token)
    {
      token=token.split(' ')[1];
    // console.warn(token);
     Jwt.verify(token,jwtKey,(err,valid)=>{
        if(err)
        {

            resp.status(401).send({result:"Please provide valid tokens"})
        }
        else
        {
           next();
        }
     })



    }
    else
    {
      resp.status(403).send({result:"Please add token with header"})
    }
    //  console.warn("Middleware called");
     // next();

 

}


app.listen(3001);