const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static((__dirname)))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//     console.log("User connected");
//     socket.broadcast.emit('hi')

//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//       socket.broadcast.emit(msg)
//     });
//     socket.on('disconnect',()=>{
//         console.log("User disconnected");
//     })
//   });

io.on('connection', (socket) => {

    socket.on('new user',(user)=>{
        console.log('new user: ' + user)
        io.emit('new user',user);
    })

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      console.log(msg);
    });
  });


server.listen(3000 || process.env.PORT, () => {
  console.log('listening on *:3000');
});