const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // 🩸 Donor joins a room for their blood group
  socket.on('join-blood-group', (bloodGroup) => {
    const room = `blood-${bloodGroup}`;
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // 🏥 Hospital emits new request
  socket.on('new-request', (data) => {
    const { bloodGroup, hospitalName, units } = data;
    const room = `blood-${bloodGroup}`;
    
    console.log(`New ${bloodGroup} request from ${hospitalName}. Broadcasting to room: ${room}`);
    
    // Broadcast to matching donors
    io.to(room).emit('notification', {
      message: `Urgent! ${hospitalName} needs ${units} units of ${bloodGroup} blood.`,
      bloodGroup,
      hospitalName,
      units,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Socket Server running on http://localhost:${PORT}`);
});
