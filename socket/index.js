//using socket.io for live chatting ->npm i socket.io
//also do npm i nodemon
//inside package.json of socket folder write start:"nodemon index.js and also "type":"module"
//Io is imported in accountprovider

import {Server} from 'socket.io';

const io = new Server(9000, { //port no is 9000 and 2nd argument is cors so that different port no doesnt crash
  cors: {
    origin: 'http://localhost:3000',
  },
})

let users =[]; //whatever the users are here are our active users

const addUser = (userData,socketId) =>{
  !users.some(user =>user.sub == userData.sub) && users.push({...userData,socketId});
}

const getUser = (userId) =>{
  return users.find(user =>user.sub === userId);
}

io.on('connection',(socket) =>{
    console.log('user connected');

    //connect
    socket.on("addUser",userData =>{ //userData is comming from frontend if frontend hit thr addUsers then the callback function will run i.e addUser()
      addUser(userData,socket.id); //it will tell how many users are online or offline...each socket has its unique id
      io.emit("getUsers",users); //if we have to send any information from backend to frontend then we can use emit..the users array who are online will go to the frontend in conversations.jsx
    })


    //send message
    socket.on('sendMessage', (data) => {
      const user = getUser(data.recieverId);
        io.to(user.socketId).emit('getMessage', data);
    });
    
    
})
//in frontend we can hit it from conversations because if we want to chat then we have to create a conversation first so go to conversations.jsx

