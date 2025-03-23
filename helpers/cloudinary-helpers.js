const cloudinary=require('../config/cloudinary-config')
const uploadclodinary=async(pathfile)=>{
    try {
        const resault=await cloudinary.uploader.upload(pathfile)
         return{
            url:resault.secure_url,
            publicId:resault.public_id
        }
    } catch (error) {
        console.error('an error happend in cloudinary',error)
        throw new Error('an error happend in cloudinary')
    }

}

module.exports={uploadclodinary}