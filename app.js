import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import sessionMidware from './controllers/session.js';

const io = new Server(server,{cors:{
    origin: (origin,callback)=>{return callback(null,true)},
    credentials:true
}});
const socketModel={
    email:{
        email:String,
        socketID:String,
        team:String
    },
    
}
io.use((socket, next) => sessionMidware(socket.request, socket.request.res, next));

io.on('connection', async(socket) => {
    // console.log('a user connected');
    let user;
    console.log(socket.request.session);
    // if(socket.request.session.email)
    //     user=socketModel['email']
    // if(user)
    // {
    //     socketModel[socket.request.session.email]['socketID']=socket.id
    // }
    // else{
    //     if(socket.request.session.email)
    //         socketModel[socket.request.session.email]['email']=socket.request.session.email
    //         socketModel[socket.request.session.email]['socketID']=socket.id
    //         user=socketModel[socket.request.session.email]
    // }

    
    socket.on('joinTeam',async({team,email})=>{
        console.log(team,email)
        socketModel[email]={}
        socketModel[email].email=email
        socketModel[email].team=team
        socketModel[email].socketID=socket.id
        user=socketModel[email]
        socket.join(team)
        socket.to(team).emit('newUser',user)
    })
    socket.on('onType',async({type,data,event})=>{
        console.log(data,event)
        socket.to(user.team).except(user.socketID).emit('onType',{type,data,event,user})
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socketModel[socket.request.session.email]=undefined
    });
});



server.listen(80, () => {
  console.log('listening on 80');
});