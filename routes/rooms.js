const Router = require("express")

const router = Router()

const { Room } = require("../model/user.js")

router.get("/:room",async (req,res) => {
  try{
    const Rooms = await Room.find({room : req.params.room})
    if(!Rooms){
      throw new Error ("No users found")
    }
    res.status(200).json(Rooms)
  }catch(error){
    res.status(400).json({message : error.message})
  }
})

module.exports = router