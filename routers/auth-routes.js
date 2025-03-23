const express=require('express')
const router=express.Router()
const {registeruser,loginuser,changepassword}=require('../controllers/auth-controllers')
const authmiddleware=require('../middleware/auth-middleware')

router.post('/register',registeruser)
router.post('/login',loginuser)
router.post('/change',authmiddleware,changepassword)

module.exports=router