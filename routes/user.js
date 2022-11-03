const Router = require("express")

const router = Router()

const {User} = require("../model/user.js")


router.get("/",async (req,res) => {
  try{
    const Users = await User.find()
    if(!Users){
      throw new Error ("No users found")
    }
    res.status(200).json(Users)
  }catch(error){
    res.status(400).json({message : error.message})
  }
})

router.post("/", async(req,res) => {
  try{
    const Users = await new User({
      user : req.body.user ,
      color : req.body.color
    }).save()
    if(!Users){
      throw new Error ("No users saved")
    }
    res.status(200).json(Users)
  }catch(error){
    res.status(500).json({message : error.message})
  }
})





module.exports = router