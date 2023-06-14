import express from 'express';
import cors from 'cors';
import http from "http";
import { Socket, Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    });
});

server.listen(3001, () => {
    console.log("Server is running on port 3001")
})
