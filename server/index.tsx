import express from 'express';
const app = express();
import { createServer } from "http";

import { Server } from 'socket.io';
import cors from 'cors';
import {formatMessage} from './messages';
import { userJoin, userJoinRoom, getCurrentUser } from './users';

const port = 4001;

app.use(cors);

// app.use("/server", (req: any, res: any) => {
//  res.send("Server is running")
// });

// const httpServer = createServer();
const httpServer = createServer(function(req: any, res: any) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`WEB SOCKET SERVER IS RUNNING @ PORT : ${port}`);
    res.end();    
});

const io = new Server(httpServer, {
 cors: {
    origin: 'https://react-socketio-ts-client.vercel.app',
    methods: ["GET", "POST"],
 },
});
let userdata: any;
let xuser: any;
let xreceipient: any;
let xroom: any;
let onlineUsers: string[] = [];
io.on("connection", (socket: any) => {

    // ======= USER TO USER ONLY ==================================
    socket.on('joinUser',(data: any) => {
        userdata = data;
        xuser = data.username;

        onlineUsers.push(xuser);

        const user = userJoin(socket.id, data.username, data.receipient);
        socket.join(data.username);

        // EMIT TO EVERYONE INCLUDING THE SENDER
        io.emit('userRoom', formatMessage(user, `..is now online.`));            
    });

    socket.on("userRoom", (data: any) => {
        console.log(`sending chat message ${xuser} : ${data}`);
        io.to(xuser).emit('receiver', formatMessage(data, data.message));    
    });

    socket.on('userChat',(data: any) => {
        xreceipient = data.xreceipient;
        io.to(data.xreceipient).emit('userChat', formatMessage(data, data.message));    
    });

    // =========== ROOM TO ROOM ONLY =========================================
    socket.on('joinGroup',(data: any) => {
        userdata = data;
        xuser = data.username;
        xroom = data.room;

        onlineUsers.push(xuser);

        const userGroup = userJoinRoom(socket.id, data.username, data.room);
        socket.join(data.room);
        
        // EMIT TO EVERYONE INCLUDE THE SENDER
        io.emit('groupMessage', formatMessage(userGroup, `${data.username} of ${data.room} is now online.`));    
        
        // EMIT TO SPECIFIC ROOM        
        // io.to(data.room).emit('message', formatMessage(user, `..has joined the ${data.room}  Chat Room`));    

    });

    socket.on("groupChat", (data: any) => {
        io.to(data.room).emit('groupChat', formatMessage(data, data.message));    
    });

    socket.on("broadcastMessage", (data: any) => {
        console.log(data.message);
        console.log(data.username);
        io.emit('broadcastMessage', formatMessage(data, data.message));    
    });

    socket.on('disconnect', () => {
        let idx: number = onlineUsers.indexOf(xuser)  // GET USER INDEX NO 
        delete onlineUsers[idx];   // DELETE ITEM USING INDEX NO

        var j;
        var nums = onlineUsers;
        onlineUsers.length = 0;  // RE-INITIAL ARRAY TO 0
        for (j in nums) {
           onlineUsers.push(nums[j].toString());
        }        
        const user = getCurrentUser(socket.id);
        console.log(user);
        io.emit('offLine',  formatMessage(user,'...has logged out.'));
    });

});

httpServer.listen(port, () => {
    console.log(`SERVER IS RUNNING @ PORT : ${port}`);
});
