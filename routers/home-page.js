const express=require('express')
const router=express.Router()
const authmiddleware=require('../middleware/auth-middleware')

router.get('/welcom',authmiddleware,(req,res)=>{
    const {userid,username,role}=req.userInfo
    res.status(200).json({
        message:'welome to the home page ',
        user:{
            id:userid,
            name:username,
            role:role
        }
    })
})

module.exports=router