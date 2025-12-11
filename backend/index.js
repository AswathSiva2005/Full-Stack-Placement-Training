const express = require('express');
const mongoose = require('mongoose');
require('./db');
const app = express();
const port = 3000;


app.get('/',(req,res)=>{

res.send("hello")
})

const userSchema = new mongoose.Schema({
    username: {type: String,required: true},
    email : {type:String,required:true,unique:true},
    age:{type:Number,required:true}
});

const User = mongoose.model('User',userSchema);

const newUser = new User({
    username:"hari",
    email:"hari1@gmail.com",
    age:22
});



newUser.save().then(()=>{
    console.log("User saved successfully");

}).catch((err)=>{
    console.log("Error saving user:",err);
})

app.listen(port,()=>{
    console.log(`running on port ${port}`)
});


    // app.get('/users/:userID',(req,res)=>{
    //     const userID = req.params.userID;
    //     res.send(`User ID is ${userID}`)
    
    // app.get('/users/:userID/profile',(req,res)=>{
    //     const userID = req.params.userID;
    //     const name = req.query.name;
    //     const age = req.query.age;
    //     res.send(`PROFILE OF USER ID : ${userID}, NAME : ${name} , AGE : ${age} `)
    // })
    
    // app.put('/user',(req,res)=>{
    //     res.send(`PUT REQUEST SENT TO /users`)
    // })
    
    // app.delete('/deluser',(req,res)=>{
    //     res.send("deleted user")
    // })
    // app.post('/adduser',(req,res)=>{
    //     res,send("adding user ....")
    // })
    
    
    // });