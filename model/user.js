const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  user : {
    type : String ,
    default : "Chatuser"
  },
  color : {
    type : String ,
    default : "red"
  }
})

const time = new Date(Date.now()).getHours() +
":" +
new Date(Date.now()).getMinutes()

const roomSchema = new mongoose.Schema({
  room : {
    type : String ,
    default : "Chatuser"
  },
  user: {
    type : String ,
    default : "Chatuser"
  },
  message: {
    type : String ,
    default : "Hello"
  },
  time:{
    type : String ,
    default : time
  }
})

const roomlistSchema = new mongoose.Schema({
  room : {
    type : String ,
    default : "No data"
  }
})


module.exports.User = mongoose.model("User",userSchema)

module.exports.Room = mongoose.model("Room",roomSchema)

module.exports.Roomlist = mongoose.model("Roomlist",roomlistSchema)