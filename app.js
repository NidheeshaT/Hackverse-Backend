import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import sessionMidware from "./controllers/session.js";
import session from "express-session";
import cors from "cors";
import authRouter from "./routes/auth.js";
import passport from "passport";
import mongoose from "mongoose";
import User from "./models/UserModel.js";
const url=process.env.CONNECT_DB_URL

const isLoggedin=(req,res,next)=>{
    if(req.user){
    req.session.user=req.user
    }
    if(req.session.user){
        next()
    }else{
        res.status(403).send("not logged in")
    }
}

const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: 'http://localhost',
    }
))

app.use(sessionMidware);
app.use(passport.initialize())
app.use(passport.session())
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });
app.use('/',authRouter)
app.get('/',passport.authenticate('google',{successRedirect: '/success',failureRedirect: '/failure'}))

app.get('/success',isLoggedin,async(req,res)=>{
    res.send("success")
})
app.get('/failure',(req,res)=>{
    res.send("failure")
})
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connected to database")
    app.listen(80,()=>{
        console.log("listening at port 80")
    })    
}).catch((err)=>{
    console.log(err)
})

