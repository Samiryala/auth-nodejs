const express=require('express')
const authmiddleware=require('../middleware/auth-middleware')
const isuseradmin=require('../middleware/admin-middleware')
const router = express.Router()

router.get('/welcom',authmiddleware,isuseradmin,(req,res)=>{
return res.json({
    message:"welcom to admin page"
})
})



module.exports=router