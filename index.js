const express = require('express');
const cors = require("cors");
const http = require("http")
const app = express();
const bodyParser = require("body-parser");
const formRoutes = require('./routes/routes.js');
const path = require('path');
const server = http.createServer(app); // Corrected typo
const { Server } = require('socket.io');
// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());

// use socket.io👍 💯

const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
})

io.on('connection', (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("send-message", (message)=>{
     // received message to all connection
   io.emit("received message", message)
   console.log(message)
  })
  
 
  socket.on("disconnect", ()=>console.log("User disconnected"))
});

// use socket.io 👍 💯



// Connect to the database
const Connection = require('./database/db.js');
const { log } = require('console');
Connection();

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use form submission routes
app.use('/api/forms', formRoutes);





// Start the server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
