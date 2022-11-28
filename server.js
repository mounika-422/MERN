const express=require('express');
const app=express();
const mongoose=require('mongoose');
const devuser=require('./devusermodel');
mongoose.connect('mongodb+srv://mounika-c:quwGqjOc66XDxU7t@cluster0.hdcwg3d.mongodb.net/?retryWrites=true&w=majority')
.then(
    ()=>console.log('DB connected'))
app.get('/',(req,res) => {
    return res.send('hello,world');
})
app.post('/register',async(req,res)=>{
    try{
        const {fullname,email,mobile,skill,password,confirmpassword}= req.body.json();
        const exist=await devuser.findOne({email});
        if(exist){
            return res.status(400).send("user already registered");
        }
        if(password!=confirmpassword){
            return res.status(403).send('password Invalid');
        }
        let newUser=new devuser({
            fullname,email,mobile,skill,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send("user registered sucessfully");
    }catch(err){
        console.log(err);
        return res.status(500).send('server error')
    }
})
app.listen(8000,()=>console.log("server running"));