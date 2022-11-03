const Router = require("express")

const router = Router()

const { Roomlist } = require("../model/user.js")

router.get("/",async (req,res) => {
  try{
    const Rooms = await Roomlist.find()
    if(!Rooms){
      throw new Error ("No users found")
    }
    res.status(200).json(Rooms)
  }catch(error){
    res.status(400).json({message : error.message})
    return
  }
})

router.post("/",async (req,res) => {
  try{
    let Rooms = await Roomlist.findOne({room : req.body.room}).lean()
    console.log(Rooms)

    if(!Rooms){
      Rooms = await new Roomlist({
        room : req.body.room
      }).save()
      Rooms = Rooms._doc
      return res.status(200).json(Rooms)
    }
    res.status(200).json("Already existed")
  }catch(error){
    res.status(400).json({message : error.message})
    return
  }
})

router.get("/:room",async (req,res) => {
  try{
    const Rooms = await Roomlist.findOne({room : req.params.room}).lean()
    if(!Rooms){
      return res.status(200).json("Data not existed")
    }
    res.status(200).json("Data existed")
  }catch(error){
    res.status(400).json({message : error.message})
  }
})


module.exports = router