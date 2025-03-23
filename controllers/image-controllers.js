const image = require('../models/image')
const {uploadclodinary}=require('../helpers/cloudinary-helpers')
const cloudinary= require('../config/cloudinary-config')
const uploadedimage=async(req,res)=>{
    try {
        console.log('File received:', req.file);
        if(!req.file){
           return res.status(400).json({
                success:false,
                message:"upload an image"
            })
        }
        //upload in cloudinary 
        const {url,publicId}= await uploadclodinary(req.file.path)
        //store in mongo db 
        const newimage=new image({
            url,
            publicId,
            uplodedby:req.userInfo.userid
        })
        await  newimage.save()
            res.status(201).json({
            success:true,
            message:"image uploaded",
            image:newimage
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"somthing go wrong"
        })
    }
}

const imagefinding=async(req,res)=>{
    try {
        const page=parseInt(req.query.page)||1
        const limit=parseInt(req.query.limit)||2
        const skip = (page-1)*limit
        const sortby=req.query.sortBy ||'createdAt'
        const sortorder=req.query.sortOrder ==='asc'?1:-1
        const totalimage=await image.countDocuments()
        const totalpage=Math.ceil(totalimage/limit)
        if (page>totalpage){
           return res.status(400).json({
                success:false,
                message:"this page does not exist"
            })
        }
        const sortobject={}
         sortobject[sortby]=sortorder
        const images=await image.find().sort(sortobject).skip(skip).limit(limit)
        if(images){
            res.status(200).json({
                success:true,
                currentpage:page,
                totalpage: totalpage,
                totalimage:totalimage,
                data:images
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"somthing go wrong"
    })
}
}

const delteimage=async(req,res)=>{
    try {
        const imageidtodelete=req.params.id
        const getuserid =req.userInfo.userid

        const Image=await image.findById(imageidtodelete)
        if(!Image){
            return res.status(400).json({
                success:false,
                message:"this image does not exist"
            })
        }
        if(Image.uplodedby.toString() !== getuserid){
            return res.status(403).json({
                success:false,
                message: "your not the user that upload the image"
            })
        }
        console.log('hna')
        //deleted from cloudinary 
        await cloudinary.uploader.destroy(Image.publicId)
        //deleted from mongo
        await image.findByIdAndDelete(imageidtodelete)
        res.status(200).json({
            success:true,
            message:"the image has been deleted",
            data:Image
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"somthing go wrong when deleting the image "
        })
    }
}
module.exports={uploadedimage,imagefinding,delteimage}   