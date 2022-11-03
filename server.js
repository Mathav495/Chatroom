const express = require("express")
const mongoose = require("mongoose")
const http = require("http")
const cors = require("cors")
const morgan = require("morgan")
const Userroutes = require("./routes/user.js")
const { Server }  = require("socket.io")
require("dotenv").config()
const { Room } = require("./model/user.js")
const { Roomlist } = require("./model/user.js")
const Roomroutes = require("./routes/rooms.js")
const Roomlistroutes = require("./routes/roomlist.js")
const app = express()
const server = http.createServer(app)

const io = new Server(server,{
  cors : {
    origin : "http://localhost:8080",
    methods : ["GET","POST"]
  }
})

io.on('connection', (socket) => {
  console.log("User connected",socket.id)

  socket.on("join_room",(data) => {
    socket.join(data)
    console.log(`User with id ${socket.id} joined ${data} Chatroom`)
  })

  socket.on("send_message",async (data) => {
    console.log(data)

    await new Room({
      room : data.room ,
      user : data.user ,
      message : data.message ,
      time : data.time
    }).save()
    socket.to(data.room).emit("receive_msg",data)
    console.log(`after`,data)
  })

  socket.on("disconnect",() => {
    console.log("User disconnected",socket.id)
  })
})

app.use(express.json())

app.use(cors())

app.use(morgan("tiny"))

app.use("/api/users",Userroutes)

app.use("/api/chatroom",Roomroutes)

app.use("/api/roomlist",Roomlistroutes)


app.get("/",(req,res) => {
  res.send("Hello World")
})

const home = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URL)
      server.listen(process.env.PORT, () => {
          console.log(`Server is running at the port ${process.env.PORT}`)
      })
  } catch (error) {
      console.error(error)
  }
}

home()