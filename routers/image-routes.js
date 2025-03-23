const express=require('express')
const router=express.Router()
const authmiddleware=require('../middleware/auth-middleware')
const isuseradmin=require('../middleware/admin-middleware')
const uploadmid=require('../middleware/upload-middleware')
const {uploadedimage,imagefinding,delteimage}=require('../controllers/image-controllers')
//upload image 
router.post('/upload',authmiddleware,isuseradmin,uploadmid.single('image'),uploadedimage)
//get all image
router.get('/get',authmiddleware,imagefinding)
//delete image 
router.delete('/delete/:id',authmiddleware,isuseradmin,delteimage)
module.exports=router