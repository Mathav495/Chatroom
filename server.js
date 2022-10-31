const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()

const app = express()

app.use(express.json())

app.use(cors())

app.use(morgan("tiny"))

app.get("/",(req,res) => {
  res.send("Hello World")
})

const home = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URL)
      app.listen(process.env.PORT, () => {
          console.log(`Server is running at the port ${process.env.PORT}`)
      })
  } catch (error) {
      console.error(error)
  }
}

home()