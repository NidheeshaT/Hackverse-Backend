import express from "express";
import { MongoClient } from "mongodb";

const url="mongodb://localhost:27017";
const mongoClient=new MongoClient(url);
const dbName="Hackverse";
const app=express()



mongoClient.connect().then(()=>{
    console.log("connected to database")
    const db = client.db(dbName);
    app.listen(80,()=>{
        console.log("listening at port 80")
    })    
}).catch((err)=>{
    console.log(err)
})

