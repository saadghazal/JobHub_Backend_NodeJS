const express = require('express')
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require('./routes/user')
const jobRoute  = require ("./routes/job")
const bookmarkRoute = require("./routes/bookmark")
const chatRoute = require('./routes/chat')
const messageRoute = require('./routes/messages')
dotenv.config();
// process.env.VARIABLE_NAME

mongoose.connect(process.env.MONGO_DB_URL).then(result => {
    console.log("CONNECTED")
}).catch(err =>{
    console.log("NOT CONNECTED")
}) 
app.use(morgan("dev"))
app.use(express.json())
app.use("/api",authRoute)

// localhost:5001/api/register

app.use('/api/users',userRoute)

// localhost:5001/api/users/id

app.use("/api/jobs",jobRoute)

app.use("/api/bookmarks",bookmarkRoute)
app.use('/api/chats',chatRoute)
app.use('/api/messages',messageRoute)



const server = app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`))


const io = require('socket.io')(server,{
    pingTimout: 60000,
    cors: {
        // origin: "http:localhost:5001"
        // hosted server
        origin:  "https://jobhubbackendnodejs-production.up.railway.app/"
    }
})

io.on("connection",(socket)=>{
    console.log('Connected To Socket')
    socket.on('setup',(userId)=> {
        socket.join(userId)
        socket.broadcast.emit('online-user',userId)
        console.log(userId)
    })

    socket.on('typing',(room)=>{
        console.log('typing')
        console.log(room)
        socket.to(room).emit('typing',room)
    })

    socket.on('stop typing',(room)=>{
        console.log('stop typing')
        console.log(room)
        socket.to(room).emit('stop typing',room)
    })

    socket.on('join chat',(room)=>{
        socket.join(room)
        console.log('User Joined: '+room)
    })

    socket.on('new message',(newMessageReceived)=>{
        let chat = newMessageReceived.chat;
        let room = chat._id
        let sender = newMessageReceived.sender
        let senderId = sender._id

        if(!sender || !senderId){
            console.log('Sender not defined')
            return
        }
        console.log(senderId + "message sender")
        const users = chat.users;


        if(!users){
            console.log('Users not defined')
            return;
        }
        socket.to(room).emit('message received',newMessageReceived)
        socket.to(room).emit('message sent',"New Message")
    })

    socket.off('setup',(userId)=>{
        console.log('User offline')
        socket.leave(userId)
    })
})